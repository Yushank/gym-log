"use client"

import { useParams } from "next/navigation";
import { useLog } from "../../hooks";
import { FullLog } from "../../components/FullLog";



export default function log() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
    const { log, error, isLoading } = useLog({ id: id });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                {error.includes('log in') && (
                    <button onClick={() => window.location.href = '/signin'}>
                        Go to sign in
                    </button>
                )}
            </div>
        )
    }

    if (!log) {
        return <div>
            Log not found
        </div>
    }

    return <FullLog log={log} />
}