"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


export const Appbar = () => {

    const { data: session } = useSession();
    const router = useRouter();

    async function SignupNavigation() {
        router.push("/signup")
    }


    return <div >
        <div className="flex justify-between bg-black h-10 items-center">
            <div>
                <Link href={'/logs'}>
                    <h1 className="text-2xl font-bold text-white ml-2">GYM LOG</h1>
                </Link>
            </div>
            <div className="flex space-x-5">
                {!session ? (
                    <>
                        <Button onclick={() => signIn()} label="Signin" color="blue" />
                        <Button onclick={SignupNavigation} label="Register" color="gray" />
                    </>
                ) : (
                    <>
                        <Button onclick={() => signOut()} label="Signout" color="red" />
                        <Button onclick={() => router.push('/addLog')} label="Create Session" color="blue" />
                    </>
                )}
            </div>
        </div>
    </div>
}


interface ButtonProps {
    label: string,
    color: 'blue' | 'red' | 'gray',
    onclick: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ label, color, onclick }: ButtonProps) {
    const baseClasses = "rounded-lg text-white px-2 h-8 w-35"

    const colorClasses = {
        blue: "bg-blue-500",
        red: "bg-orange-500",
        gray: "bg-gray-500"
    }

    const colorClass = colorClasses[color] || "bg-gray-500"

    return <div>
        <button onClick={onclick} className={`${baseClasses} ${colorClass}`}>{label}</button>
    </div>
}