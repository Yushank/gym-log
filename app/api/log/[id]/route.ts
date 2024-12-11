import { NextRequest, NextResponse } from "next/server";
import client from '@/db'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ? parseInt(session.user.id) : undefined;

    if (!userId) {
        return NextResponse.json({
            msg: "Unauthorized"
        }, { status: 401 })
    }

    try {
        const url = new URL(req.url);
        const id = parseInt(url.pathname.split('/').pop() || '', 10);

        const log = await client.session.findFirst({
            where: {
                id: id,
                userId: userId
            },
            select: {
                id:true,
                title: true,
                createdAt: true,
                exercise: {
                    select: {
                        name: true,
                        sets: true
                    }
                }
            }
        });

        if (!log) {
            return NextResponse.json({
                msg: "Log not found or access denied"
            }, { status: 403 })
        }

        return NextResponse.json(log)
    }
    catch (error) {
        return NextResponse.json({
            msg: `failed to fetch log: ${error}`
        })
    }
}



export async function DELETE(req: NextRequest){
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ? parseInt(session.user.id) : undefined;



    if(!userId){
        return NextResponse.json({
            msg: "unauthorized"
        }, {status: 401})
    }

    try{
        const url = new URL(req.url);
        const id = parseInt(url.pathname.split('/').pop() || '', 10);

        console.log("id is",id)

        if (isNaN(id)) {
            return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
        }

        const log = await client.session.findFirst({
            where:{
                id: id,
                userId: userId
            }
        });

        console.log("log is: ", log)

        if(!log){
            return NextResponse.json({
                msg: "Log not found or access denied"
            }, {status: 404})
        }

        console.log("Attempting to delete log with id: ", log.id);

        await client.$transaction([
            client.sets.deleteMany({
                where: {
                    exercise: {
                        sessionId: id,
                    },
                },
            }),
            client.exercise.deleteMany({
                where: {
                    sessionId: id,
                },
            }),
            client.session.delete({
                where: {
                    id: id,
                    userId: userId,
                },
            }),
        ]);

        console.log("Log deleted successfully");

        return NextResponse.json({
            msg: "Post deleted successfully"
        })
    }
    catch(error){
        console.error("delete log error:", error)
        return NextResponse.json({
            msg: `Failed to delete log: ${error}`
        })
    }
}