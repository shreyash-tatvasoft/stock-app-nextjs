// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Assuming token is stored in cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next(); // Continue to the requested page
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/","/stock-dashboard", "/dashboard", "/watchlist", "/portfolio"], // Protect only these pages
};
