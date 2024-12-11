"use client"

import { useRouter } from "next/navigation";
import { LogsCard } from "../components/Logs";
import { useLogs } from "../hooks"



export default function Logs() {
    const { sessions, isLoading } = useLogs();
    const router = useRouter();

    if(isLoading){
        return <div>Loading...</div>
    }
    
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

        </div>
    )
}
