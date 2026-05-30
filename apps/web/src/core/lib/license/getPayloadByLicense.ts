import { LicencePayload, licenseManager } from "./clientLicenseValidator";

export async function GetPayloadByLicense(license: string) {
  let payload: LicencePayload | null = null;

  if (license) {
    payload = await licenseManager.validateLicense(license);
  }
  return payload;
}
