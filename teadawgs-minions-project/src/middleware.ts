import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../config/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname);

    const publicPaths = ["/", "/login-page", "/create-account-page"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/login-page", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/add-post",
        "/add-recipe",
        "/authenticated-view",
        "/food-page",
        "/history"
    ],
};

export default middleware;