

interface Session {
    id: number,
    title: string,
    userId: string,
    createdAt: string,
    exercises: Exercise[]
}

interface Exercise {
    id: number,
    name: string,
    sessionId: number,
    sets: Set[]
}

interface Set {
    id: number,
    weight: number,
    reps: number,
    exerciseId: number
}

export const FullLog = ({ log }: { log: Session }) => {
    if(!log){
        return <div>Log not found</div>
    }
    return (
        <div>
            <h2>{log.title}</h2>
            <p>Date: {new Date(log.createdAt).toLocaleDateString()}</p>
        </div>
    )
}