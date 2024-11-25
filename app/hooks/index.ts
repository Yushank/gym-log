"use client"

import axios from "axios";
import { useEffect, useState } from "react"

interface Set {
    id: number,
    weight: number,
    reps: number,
    exerciseId: number
}

interface Exercise {
    id: number,
    name: string,
    sessionId: number,
    sets: Set[]
}

interface Session {
    id: number,
    title: string,
    userId: string,
    createdAt: string,
    exercises: Exercise[]
}


export const useLogs = () => {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        axios.get('api/log')
            .then(response => {
                setSessions(response.data)
            })
    }, [])

    return { sessions }
}