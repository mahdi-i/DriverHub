import { cookies } from "next/headers";

export function getAccessToken(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("licenseToken="))
      ?.split("=")[1] || null
  );
}

export async function getAccessTokenSSR() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("licenseToken").value;

    return cookie || null;
  } catch {
    return null;
  }
}
