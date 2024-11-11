"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function () {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div>
        <input type="text" placeholder="peter@gmail.com"
            onChange={(e) => {
                setUsername(e.target.value);
            }}></input>
        <input type="password" placeholder="******"
            onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
        <button onClick={async () => {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false
            })
            console.log(res);
            router.push("/");
        }}>Login with email</button>
    </div>
}