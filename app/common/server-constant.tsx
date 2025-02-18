"use server"

import { cookies } from "next/headers";

export const getTokenFromCookie = async () => {
    const cookieState = await cookies();
    const tokenVal = cookieState.get("authToken")?.value || "";
    return tokenVal
}