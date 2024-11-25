import { useRouter } from "next/navigation"

interface LogsCardProp {
    id: number,
    title: string,
    createdAt: string
}


export const LogsCard = ({ id, title, createdAt }: LogsCardProp) => {
    const router = useRouter();


    return <div className="bg-slate-500 h-screen w-screen relative">
        <div>
            <div>{title}</div>
            <div>{createdAt}</div>
        </div>
        <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            onClick={() => router.push('/addLog')}>Create Session</button>
    </div>
}