import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/db"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"



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

    callbacks: {
        jwt: async({token, user} : {token: JWT; user: any})=>{
            if(user){
                token.uid = user.id;
            }
            return token;
        },

        session: async({session, token} : {session: Session; token: JWT})=>{
            if(session.user){
                session.user.id = token.uid as string;
            }
            return session;
        }
    },
    
    pages :{
        signIn: '/signin',
    }
}