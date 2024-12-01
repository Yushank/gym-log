"use client"

import { useRouter } from "next/navigation";
import { LogsCard } from "../components/Logs";
import { useLogs } from "../hooks"



export default function Logs() {
    const { sessions } = useLogs();
    const router = useRouter();

    return (
        <div className="relative mix-h-screen p-4">
            <div className="grid gap-4">
                {sessions.map(session => <LogsCard
                    key={session.id}
                    id={session.id}
                    title={session.title}
                    createdAt={new Date(session.createdAt).toLocaleDateString()}
                ></LogsCard>)}
            </div>
            <div>
                <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                    onClick={() => router.push('/addLog')}>Create Session</button>
            </div>
        </div>
    )
}
