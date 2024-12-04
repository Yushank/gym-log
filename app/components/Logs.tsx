import Link from "next/link"
import { useRouter } from "next/navigation"

interface LogsCardProp {
    id: number,
    title: string,
    createdAt: string
}


export const LogsCard = ({ id, title, createdAt }: LogsCardProp) => {


    return ( <Link href={`/log/${id}`}>
        <div className="bg-white shadow-md rounded-md p-4 m-4 max-w-md">
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-gray-500 text-sm">{createdAt}</div>
        </div>
        </Link>
    )
}