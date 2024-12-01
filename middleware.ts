import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function middleware(req: NextRequest){
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    const protectedRoutes = [
        '/logs',
        '/addLog',
        '/api/log'
    ]

    const isProtectedRoute = protectedRoutes.some(route =>
        req.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !token){
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:[
        '/logs/:path',
        '/addLog/:path',
        '/api/log'
    ]
}

