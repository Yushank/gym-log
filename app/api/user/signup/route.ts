import { NextRequest, NextResponse } from "next/server";
import client from '@/db'



export async function POST(req: NextRequest){

    const body = await req.json();

    try{
        const isUserExist = await client.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if(isUserExist){
            return NextResponse.json({
                message: "Username already exist"
            })
        }

        const user = await client.user.create({
            data: {
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password
            }
        })

        return NextResponse.json({
            userId: user.id,
            message: "Signup successfull"
        })
    }
    catch(error){
        return NextResponse.json({
            message: `Error while signing up : ${error}`
        })
    }
}