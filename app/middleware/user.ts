import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';



export function authMiddleware(req: NextRequest){
    try{
        const token = req.cookies.get("token")?.value;

        if(!token){
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET as string)as JwtPayload

        req.headers.set('userId', decode.id)

        return NextResponse.next();
    }
    catch(error){
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}