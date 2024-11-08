import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/db"



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "peter@gmail.com"},
                password: {label: "Password", type: "password", placeholder: "password"}
            },
            async authorize(credentials: any){

                const user = await client.user.findFirst({
                    where:{
                        email: credentials.username
                    }
                })

                if(user && user.password === credentials.password){
                    return {id: String(user.id)}
                };

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}