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

    async function sendRequest(){
        try{
            const response = await axios.post("/api/user/signup", {
                postInputs
            })
            router.push("/api/auth/signin")
        }
        catch(error){
            alert('Error while signing up');
            console.log(error)
        }
    }


    return <div>
        <div>
            <div>
                <div>Signup</div>
                <LabelledInput label="Username" placeholder="peter@gmail.com" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}></LabelledInput>
                <LabelledInput label="First Name" placeholder="Peter" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        firstName: e.target.value
                    })
                }}></LabelledInput>
                <LabelledInput label="Last Name" placeholder="Parker" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        lastName: e.target.value
                    })
                }}></LabelledInput>
                <LabelledInput label="Password" type="password" placeholder="Password" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}></LabelledInput>
                <button onClick={sendRequest}>Signup</button>
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

function LabelledInput({label, placeholder, type, onChange} : LabelledInput){
    return <div>
        <label>{label}</label>
        <input placeholder={placeholder} type={type || "text"} onChange={onChange} ></input>
    </div>
}