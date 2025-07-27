// the get getToken gets the user's JWT token
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

// whatever comes inside the matcher sets authentication only for those pages
export const config = { matcher: ["/create", "/view", "/profile"] }

export async function middleware(request : NextRequest){

    // if the user has the JWT token, then this token variable will now contain the payload of it
    const token = await getToken({ req : request, secret: process.env.NEXTAUTH_SECRET});

    const url = request.nextUrl;

    // if the user has token and the given routes are hit, then redirect the user
    if (token && (url.pathname.startsWith("/login") || url.pathname === "/")) {
        return NextResponse.redirect(new URL("/view", request.url));
    }

    if (
    !token &&
    (
        url.pathname.startsWith("/create") ||
        url.pathname.startsWith("/view") ||
        url.pathname.startsWith("/profile")
    )
    ) {
    return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();

}