import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const emrToken = req.cookies.get("emrAuthToken")?.value || "";

  const authToken = req.cookies.get("authToken")?.value || "";

  if (
    !emrToken &&
    req.nextUrl.pathname.startsWith("/pharmaeco-guard/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/pharmaeco-guard/auth/signin", req.url)
    );
  }

  if (!authToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/pharmaeco-guard/dashboard/:path*"],
};
