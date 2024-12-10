import { DeleteLog } from "./DeleteLog"


interface Session {
    id: number,
    title: string,
    userId: string,
    createdAt: string,
    exercise: Exercise[]
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

export const FullLog = ({ log }: { log?: Session }) => {
    if (!log) {
        return <div>Log not found</div>
    }
    return (
        <div>
            <h1 className="font-bold text-2xl">{log.title}</h1>
            <p className="text-slate-500 mb-4">Date: {new Date(log.createdAt).toLocaleDateString()}</p>
            {log.exercise && log.exercise.length > 0 ? (
                
                    log.exercise.map((exercise, index) => (
                        <div key={index}>
                            <h3 className="font-medium mb-2">Exercise: {exercise.name}</h3>
                            {exercise.sets && exercise.sets.length > 0 && (
                                <ul className="mb-3">
                                    {exercise.sets.map((set)=>(
                                        <li key={set.id}>
                                            Weight: {set.weight} kg, Reps: {set.reps}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                
            ) : (
                <p>No exercise found</p>
            )}
            <div>
                <DeleteLog id = {log.id}></DeleteLog>
            </div>
        </div>
    )
}