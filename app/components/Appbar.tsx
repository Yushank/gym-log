"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import React from "react";


export const Appbar = () => {

    const { data: session } = useSession();
    const router = useRouter();

    async function SignupNavigation(){
        router.push("/signup")
    }


    return <div>
        <div className="flex justify-end space-x-5 bg-slate-300">
            {!session ? (
                <>
                    <Button onclick={()=> signIn()} label="Signin" color="blue" />
                    <Button onclick={SignupNavigation} label="Register" color="gray"/>
                </>
            ) : (
                <Button onclick={()=> signOut()} label="Signout" color="red" />
            )}
        </div>
    </div>
}


interface ButtonProps {
    label: string,
    color: 'blue' | 'red' | 'gray',
    onclick: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ label, color, onclick }: ButtonProps) {
    const baseClasses = "rounded-lg text-white px-2"

    const colorClasses = {
        blue: "bg-blue-500",
        red: "bg-orange-500",
        gray: "bg-gray-500"
    }

    const colorClass = colorClasses[color] || "bg-gray-500"

    return <div>
        <button onClick = {onclick} className={`${baseClasses} ${colorClass}`}>{label}</button>
    </div>
}