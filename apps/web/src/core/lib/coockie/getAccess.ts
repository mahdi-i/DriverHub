import { cookies } from "next/headers";

export function getAccessToken(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1] || null
  );
}
export function getRefreshToken(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1] || null
  );
}

export async function getAccessTokenSSR() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("accessToken");

    return cookie?.value || null;
  } catch (error) {
    console.error("Error reading cookies:", error);
    return null;
  }
}
export async function getRefreshTokenSSR() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("refreshToken");

    return cookie?.value || null;
  } catch (error) {
    console.error("Error reading cookies:", error);
    return null;
  }
}
