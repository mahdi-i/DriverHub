import { cookies } from "next/headers";
import { UserEntity } from "../assets/@types/userEntity";
import { BASE_URL } from "../lib/basic-link/BackendBasicLink";

export async function getUserInfo() {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;

  if (!license) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${license}`,
      },
      next: { revalidate: 36000 },
    });

    if (!res.ok) {
      return null;
    }

    const user: UserEntity = await res.json();
    return user;
  } catch {
    return null;
  }
}
