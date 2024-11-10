"use client"

import { signupInput } from "@/schemas/userSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"




export const Signup = () => {
    const [postInputs, setPostInputs] = useState<signupInput>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const router = useRouter();

    async function sendRequest() {
        try {
            const response = await axios.post("/api/user/signup",
                postInputs
            )
            router.push("/api/auth/signin")
        }
        catch (error) {
            alert('Error while signing up');
            console.log(error)
        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold text-center">Signup</div>
                <div>
                    <LabelledInput label="Username" placeholder="peter@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput label="First Name" placeholder="Peter" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            firstName: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput label="Last Name" placeholder="Parker" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            lastName: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput label="Password" type="password" placeholder="Password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Signup</button>
                </div>
            </div>
        </div>
    </div>
}


interface LabelledInput {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInput) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input placeholder={placeholder} type={type || "text"} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ></input>
    </div>
}