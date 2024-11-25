"use client"

import { LogsCard } from "../components/Logs";
import { useLogs } from "../hooks"



export default function Logs(){
    const { sessions } = useLogs();

    return <div>
        <div>
            {sessions.map(session => <LogsCard
                key={session.id}
                id={session.id}
                title={session.title}
                createdAt={new Date(session.createdAt).toLocaleDateString()}
            ></LogsCard>)}
        </div>
    </div>
}