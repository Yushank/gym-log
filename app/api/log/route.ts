import { NextRequest, NextResponse } from "next/server";
import client from '@/db';



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
    try {
        const session = await client.session.findMany();
        return NextResponse.json(session);
    }
    catch (error) {
        return NextResponse.json({
            msg: `failed to fetch sessions: ${error}`
        })
    }
}