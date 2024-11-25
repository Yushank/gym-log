"use client"

import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"


interface SetData {
    weight: number;
    reps: number;
}

interface ExerciseData {
    name: string;
    sets: SetData[];
}

interface SessionData {
    title: string;
    exercises: ExerciseData[];
}


export const CreateSessionForm = async () => {
    const router = useRouter();
    const [sessionTitle, setSessionTitle] = useState("");
    const [exercise, setExercise] = useState<ExerciseData[]>([
        { name: " ", sets: [{ weight: 0, reps: 0 }] }
    ]);
    // const session = await getSession();
    // const userId = session?.user.id;

    const addExercise = () => {
        setExercise([...exercise, { name: " ", sets: [{ weight: 0, reps: 0 }] }])
    }

    const addSet = (exerciseIndex: number) => {
        const updatedExercise = [...exercise];
        updatedExercise[exerciseIndex].sets.push({ weight: 0, reps: 0 });
        setExercise(updatedExercise);
    }

    const updateExercise = (exerciseIndex: number, field: string, value: string) => {
        const updatedExercise = [...exercise];
        updatedExercise[exerciseIndex] = { ...exercise[exerciseIndex], [field]: value };
        setExercise(updatedExercise);
    }

    const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
        const updatedExercise = [...exercise];
        updatedExercise[exerciseIndex].sets[setIndex] = { ...exercise[exerciseIndex].sets[setIndex], [field]: parseFloat(value) };
        setExercise(updatedExercise)
    }

    const submitHandler = async () => {
        const session = await getSession();
        const userId = session?.user.id;
        try {
            const response = await axios.post('api/log', {
                sessionTitle,
                exercise,
                userId
            });
            router.push('/logs')
        }
        catch (error) {
            alert('Error while creating session');
            console.log(error);
        }
    }


    return (
        <div className="rounded-lg bg-gray-100 mx-2-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Log Input Form</h2>
            <form className="space-y-4">
                <div>
                    <input className="w-full px-3 py-2 border rounded-md focus:outline-blue-500"
                        type="text"
                        placeholder="Session Title"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    {exercise.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="bg-white p-4 border rounded-md shadow-sm">
                            <input className="w-full px-3 py-2 border rounded-md focus:outline-blue-500"
                                placeholder="Exercise Name"
                                value={exercise.name}
                                onChange={(e) => updateExercise(exerciseIndex, 'name', e.target.value)}
                            ></input>


                            {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex} className="flex space-x-2 mb-2">
                                    <input className="w-1/2 px-2 py-1 border rounded-md"
                                        type="number"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', e.target.value)}
                                    ></input>
                                    <input className="w-1/2 px-2 py-1 border rounded-md"
                                        type="number"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                                    ></input>
                                </div>

                            ))}
                        </div>


                    ))}

                    <div className="flex justify-between space-x-5">
                        <button
                            className="w-full bg-green-500 py-2 m-2 rounded-md"
                            type="button"
                            onClick={addExercise}
                        >add exercise</button>
                        <button
                            className="w-full bg-blue-500 py-2 m-2 rounded-md"
                            type="button"
                            onClick={() => addSet(exercise.length - 1)}
                        >add set</button>
                    </div>
                    <div>
                        <button
                            className="w-full bg-red-500 py-2 m-2 rounded-md"
                            type="button"
                            onClick={submitHandler}
                        >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
