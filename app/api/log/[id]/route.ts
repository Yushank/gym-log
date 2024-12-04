import { NextRequest, NextResponse } from "next/server";
import client from '@/db'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(req: NextRequest, context : { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id ? parseInt(session.user.id) : undefined;

    if (!userId) {
        return NextResponse.json({
            msg: "Unauthorized"
        }, { status: 401 })
    }

    try {
        const id = parseInt(context.params.id, 10);

        const log = await client.session.findFirst({
            where: {
                id: id,
                userId: userId
            },
            select: {
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