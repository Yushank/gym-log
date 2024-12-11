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
    exercise: Exercise[]
}


export const useLogs = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        axios.get('api/log')
            .then(response => {
                setSessions(response.data)
                setIsLoading(false)
            })
    }, [])



    return { sessions, isLoading }
}


export const useLog = ({ id }: { id: string }) => {
    const [log, setLog] = useState<Session | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!id){
            setIsLoading(false);
            return;
        }

        setIsLoading(true)        
        console.log("Fetching log with ID:", id);

        axios.get(`/api/log/${id}`)
            .then(response =>{
                setLog(response.data)
                setError(null);
                setIsLoading(false);
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === 403){
                        setError("you do not have permission to view this log")
                    } else if(err.response.status === 401){
                        setError("Please log in to view this log")
                    } else{
                        setError("An error occured while fetching the log")
                    }
                } else if(err.request){
                    setError("No response received from the server")
                } else {
                    setError("Error setting up the request")
                }
                setLog(null);
                setIsLoading(false);
            })
            
    }, [id])

    return{ log, error, isLoading }
}