import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import * as crypto from 'node:crypto';

/**
 * @typedef {Object} LicencePayload
 */
export interface LicencePayload {
  licenceId: string;
  userId: number;
  role: string;
  issuedAt: string;
  expireAt: string;
  renewable: boolean;
  maxDevices?: number;
  hardwareId?: string;
  version?: string;
  features?: string[];
  isTrial?: boolean;
}

@Injectable()
export class LicenseManager {
  private readonly encKey: Buffer;
  private readonly hmacKey: Buffer;

  private readonly algorithm: string;
  private readonly ivLength: number;
  private readonly authTagLength: number;

  private readonly hmacAlgorithm: string;

  private readonly defaultExpireDays: number;
  private readonly defaultRenewable: boolean;

  private readonly requireHardwareId: boolean;
  private readonly requireFeatures: boolean;

  constructor() {
    this.encKey = Buffer.from(process.env.ENC_KEY ?? '', 'base64');
    this.algorithm = process.env.ENC_ALGORITHM || 'aes-256-gcm';
    this.ivLength = Number(process.env.ENC_IV_LENGTH) || 12;
    this.authTagLength = Number(process.env.ENC_AUTHTAG_LENGTH) || 16;

    if (this.encKey.length !== 32) {
      throw new Error('❌ ENC_KEY must be 32 bytes (base64).');
    }

    this.hmacKey = Buffer.from(process.env.HMAC_KEY ?? '', 'base64');

    if (this.hmacKey.length < 32) {
      throw new Error('❌ HMAC_KEY must be at least 32 bytes.');
    }

    this.hmacAlgorithm = this.normalizeHashAlg(
      process.env.HMAC_ALGORITHM || 'sha256',
    );

    this.defaultExpireDays =
      Number(process.env.LICENSE_DEFAULT_EXPIRE_DAYS) || 30;

    this.defaultRenewable =
      (process.env.LICENSE_RENEWABLE ?? 'true').toLowerCase() === 'true';

    this.requireHardwareId =
      (process.env.LICENSE_REQUIRE_HARDWARE_ID ?? 'false').toLowerCase() ===
      'true';

    this.requireFeatures =
      (process.env.LICENSE_REQUIRE_FEATURES ?? 'false').toLowerCase() ===
      'true';
  }

  private encryptText(plaintext: string): string {
    const iv = crypto.randomBytes(this.ivLength);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.encKey,
      iv,
    ) as crypto.CipherGCM;

    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]).toString('base64');
  }

  private decryptText(encryptedBase64: string): string {
    const buf = Buffer.from(encryptedBase64, 'base64');

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
    return decrypted.toString('utf8');
  }

  private normalizeHashAlg(name: string): string {
    const m = name.toLowerCase();

    switch (m) {
      case 'sha256':
      case 'sha-256':
        return 'SHA-256';

      case 'sha384':
      case 'sha-384':
        return 'SHA-384';

      case 'sha512':
      case 'sha-512':
        return 'SHA-512';

      default:
        throw new Error(`❌ Unsupported HMAC_ALGORITHM: ${name}`);
    }
  }

  private async sign(data: string): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      this.hmacKey,
      {
        name: 'HMAC',
        hash: this.hmacAlgorithm,
      },
      false,
      ['sign'],
    );

    const sigBuf = await crypto.subtle.sign('HMAC', key, Buffer.from(data));
    return Buffer.from(sigBuf).toString('hex');
  }

  private async verifySignature(data: string, sig: string): Promise<boolean> {
    const expectedHex = await this.sign(data);

    return crypto.timingSafeEqual(
      Buffer.from(expectedHex, 'hex'),
      Buffer.from(sig, 'hex'),
    );
  }

  public buildPayload(input: {
    userId: number;
    role: string;
    expireAt?: string;
    maxDevices?: number;
    hardwareId?: string;
    version?: string;
    features?: string[];
    isTrial?: boolean;
  }): LicencePayload {
    if (this.requireHardwareId && !input.hardwareId) {
      throw new Error('❌ hardwareId is required by env settings.');
    }

    if (this.requireFeatures && !input.features) {
      throw new Error('❌ features[] required by env settings.');
    }

    return {
      licenceId: crypto.randomUUID(),
      userId: input.userId,
      role: input.role,
      issuedAt: new Date().toISOString(),
      expireAt:
        input.expireAt ??
        new Date(Date.now() + this.defaultExpireDays * 86400_000).toISOString(),
      renewable: this.defaultRenewable,
      maxDevices: input.maxDevices,
      hardwareId: input.hardwareId,
      version: input.version,
      features: input.features,
      isTrial: input.isTrial,
    };
  }

  public async createLicense(payload: LicencePayload): Promise<string> {
    const encrypted = this.encryptText(JSON.stringify(payload));
    const signature = await this.sign(encrypted);
    return `${encrypted}.${signature}`;
  }

  public async validateLicense(license: string): Promise<LicencePayload> {
    const [enc, sig] = license.split('.');

    if (!enc || !sig) {
      throw new Error('❌ Invalid license format');
    }

    if (!(await this.verifySignature(enc, sig))) {
      throw new Error('⛔ Invalid signature (license tampered)');
    }

    const decrypted = this.decryptText(enc);
    const payload: LicencePayload = JSON.parse(decrypted);

    if (new Date(payload.expireAt) < new Date()) {
      throw new Error('⛔ License expired');
    }

    return payload;
  }
}

// ============================================================================
// Example usage
// ============================================================================

(async () => {
  try {
    const manager = new LicenseManager();

    // Step 1 — Create expireAt = now + 2 minute
    const expireAt = new Date(Date.now() + 60_000 * 2).toISOString();

    // Step 2 — Build payload with 2-minute expiration
    const payload = manager.buildPayload({
      userId: 10,
      role: 'pro',
      features: ['export'],
      hardwareId: 'DEVICE_HASH',
      maxDevices: 5,
      expireAt,
    });

    const license = await manager.createLicense(payload);

    console.log(await manager.validateLicense(license));
  } catch (err: any) {
    console.log('ERROR:', err.message);
  }
})();
