import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export async function authMiddleware(req: NextRequest){
    try{
        const session = await getServerSession({req, ...authOptions})

        if(!session){
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        return NextResponse.next();
    }
    catch(error){
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}