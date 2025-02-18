import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("authToken", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  const response = NextResponse.json({ message: "Logged out" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}