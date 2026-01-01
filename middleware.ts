// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value
//   const user = request.cookies.get('user')?.value
  
//   // const pathname = request.nextUrl.pathname
//   const {pathname} = request.nextUrl

//   // if (pathname === '/' && token && user) {
//   //   return NextResponse.redirect(new URL('/dashboard', request.url))
//   // }
//    if (pathname === "/" && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   // if (pathname === '/dashboard' && (!token || !user)) {
//   //   return NextResponse.redirect(new URL('/', request.url))
//   // }

//    if (pathname.startsWith("/dashboard") && !token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next()
// }

// export const config = {
//   // matcher: ['/', '/dashboard']
//    matcher: ["/", "/dashboard/:path*"],
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
