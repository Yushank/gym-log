import { NextRequest, NextResponse } from "next/server";
import client from '@/db'
import { signupInput } from "@/schemas/userSchema";
import jwt from "jsonwebtoken"



export async function POST(req: NextRequest){

    const body = await req.json();

    try{
        const parsePayload = signupInput.safeParse(body)

        if(!parsePayload){
            return NextResponse.json({
                message: "Invalid inputs"
            })
        }

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

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET as string)

        const response =  NextResponse.json({
            userId: user.id,
            message: "Signup successfull",
        })

        response.cookies.set("token", token);

        return response;
    }
    catch(error){
        return NextResponse.json({
            message: `Error while signing up : ${error}`
        })
    }
}