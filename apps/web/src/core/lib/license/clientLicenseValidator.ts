import { Roles } from "@driverhub/shared-types";
import * as crypto from "crypto";

export interface LicencePayload {
  licenceId: string;
  userId: string;
  role: Roles;
  issuedAt: string;
  expireAt: string;
  renewable: boolean;
  maxDevices?: number;
  hardwareId?: string;
  version?: string;
  features?: string[];
  isTrial?: boolean;
  driverId?: string;
  trineeId?: string;
}

export class LicenseManager {
  private readonly encKey: Buffer;
  private readonly hmacKey: Buffer;
  private readonly algorithm = "aes-256-gcm";
  private readonly ivLength = 12;
  private readonly authTagLength = 16;
  constructor() {
    this.encKey = Buffer.from(process.env.ENC_KEY ?? "", "base64");
    this.hmacKey = Buffer.from(process.env.HMAC_KEY ?? "", "base64");

    if (this.encKey.length !== 32) {
      throw new Error("ENC_KEY must be 32 bytes (base64).");
    }
    if (this.hmacKey.length < 32) {
      throw new Error("HMAC_KEY must be at least 32 bytes.");
    }
  }

  private encryptText(plaintext: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.encKey,
      iv,
    ) as crypto.CipherGCM;
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
  }

  private decryptText(encryptedBase64: string): string {
    const buf = Buffer.from(encryptedBase64, "base64");
    const iv = buf.slice(0, this.ivLength);
    const authTag = buf.slice(
      this.ivLength,
      this.ivLength + this.authTagLength,
    );
    const ciphertext = buf.slice(this.ivLength + this.authTagLength);

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.encKey,
      iv,
    ) as crypto.DecipherGCM;
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  }

  private async sign(data: string): Promise<string> {
    return crypto.createHmac("sha256", this.hmacKey).update(data).digest("hex");
  }

  private async verifySignature(data: string, sig: string): Promise<boolean> {
    const expected = await this.sign(data);
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  }

  public async validateLicense(
    license: string,
  ): Promise<LicencePayload | null> {
    try {
      const [enc, sig] = license.split(".");
      if (!enc || !sig) return null;

      const isValid = await this.verifySignature(enc, sig);
      if (!isValid) {
        return null;
      }

      const decrypted = this.decryptText(enc);
      const payload = JSON.parse(decrypted) as LicencePayload;

      if (new Date(payload.expireAt) < new Date()) {
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  }
}

export const licenseManager = new LicenseManager();
