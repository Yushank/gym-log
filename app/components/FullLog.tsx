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
        return <div className="text-cnter text-red-500 font-semibold mt-4">Log not found</div>
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 max-w-2xl mx-auto mt-6">
            <h1 className="font-bold text-2xl text-gray-800 mb-2 border-b pb-2">
                {log.title}
            </h1>
            <p className="text-slate-500 mb-6">Date: {new Date(log.createdAt).toLocaleDateString()}</p>
            {log.exercise && log.exercise.length > 0 ? (

                log.exercise.map((exercise, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold text-lg text-gray-700 mb-2">
                            Exercise: {exercise.name}
                        </h3>
                        {exercise.sets && exercise.sets.length > 0 && (
                            <ul className="list-disc list-inside bg-gray-100 p-3 rounded-lg">
                                {exercise.sets.map((set) => (
                                    <li key={set.id} className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Weight:
                                        </span>{" "}
                                        {set.weight} kg,{" "}
                                        <span className="font-medium">
                                            Reps:
                                        </span>{""}
                                        {set.reps}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))

            ) : (
                <p className="text-gray-500 italic mb-4">No exercise found</p>
            )}
            <div className="mt-6 flex justfy-end">
                <DeleteLog id={log.id}></DeleteLog>
            </div>
        </div>
    )
}