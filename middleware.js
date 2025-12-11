import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If user is NOT logged in and trying to access the chat (home page)
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If user IS logged in and tries to go to auth pages, send them to chat
  if (token && (pathname.startsWith("/auth"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};