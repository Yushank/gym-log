"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";




export default function () {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold text-center">Signin</div>
                <div>
                    <LabelledInput label="Username" type="text" placeholder="peter@gmail.com"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}></LabelledInput>
                    <LabelledInput label="Password" type="password" placeholder="********"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}></LabelledInput>

                    <button onClick={async () => {
                        const res = await signIn("credentials", {
                            username,
                            password,
                            redirect: false
                        })
                        console.log(res);
                        router.push("/logs");
                    }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Login with email</button>
                </div>
            </div>
        </div>
    </div>
}


interface LabelledInput {
    label: string,
    placeholder: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInput) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input placeholder={placeholder} type={type} onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></input>
    </div>
}