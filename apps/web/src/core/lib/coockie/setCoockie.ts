"use server";
import { NextResponse } from "next/server";
type SameSiteOption = "strict" | "lax" | "none" | false;
export async function setCoockie(access_token: string) {
  const cookieOptions = {
    name: "accessToken",
    value: access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as SameSiteOption,
    path: "/",
    maxAge: 15 * 60,
  };
  console.log(cookieOptions, "cookieOptions");
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: cookieOptions.name,
    value: cookieOptions.value,
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: cookieOptions.maxAge,
  });
  console.log(response, "response");
  return response;
}
