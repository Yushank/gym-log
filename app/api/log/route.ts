import { NextRequest, NextResponse } from "next/server";
import client from '@/db';
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export async function POST(req: NextRequest) {
    const { title, userId, exercise } = await req.json();

    try {
        const session = await client.session.create({
            data: {
                title: title,
                userId: userId,
                createdAt: new Date(),
                exercise: {
                    create: exercise.map((exercise: any) => ({
                        name: exercise.name,
                        sets: {
                            create: exercise.sets.map((set: any) => ({
                                weight: set.weight,
                                reps: set.reps
                            }))
                        }
                    }))
                }
            },
            include: { exercise: { include: { sets: true } } }
        });
        return NextResponse.json({
            session: session
        })
    }
    catch (error) {
        return NextResponse.json({
            msg: `failed to create session: ${error}`
        })
    }
}


export async function GET(req: NextRequest) {
    // const session = await getSession();  //will not work as getSession works for client side and getServerSession for server side
    const session = await getServerSession(authOptions)

    const userId = session?.user.id ? parseInt(session.user.id) : undefined;

    try {
        const logs = await client.session.findMany({
            where: {
                userId: userId
            }
        });
        return NextResponse.json(logs);
    }
    catch (error) {
        return NextResponse.json({
            msg: `failed to fetch sessions: ${error}`
        })
    }
}