export function getAccessToken(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1] || null
  );
}
