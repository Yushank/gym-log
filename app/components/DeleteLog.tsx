"use client"

import axios from "axios"
import { useRouter } from "next/navigation"




export const DeleteLog = ({id}: {id: number}) =>{

    const router = useRouter();

    async function deleteFunction(){
        console.log("Deleting log with ID:", id)
        
        try{
        await axios.delete(`/api/log/${id}`)
        router.push('/logs')
    }catch(error){
        console.error("Error deleting log:", error);
    }
    }
    return (
        <div>
            <button onClick={deleteFunction} 
            className="rounded-lg text-white px-2 bg-orange-500">Delete Log</button>
        </div>
    )
}