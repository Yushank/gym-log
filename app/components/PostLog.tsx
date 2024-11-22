"use client"

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


export const CreateSessionForm = () => {
    const [sessionTitle, setSessionTitle] = useState("");
    const [exercise, setExercise] = useState<ExerciseData[]>([
        { name: " ", sets: [{ weight: 0, reps: 0 }] }
    ]);

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


    return (
        <div className="rounded-lg bg-gray-100 mx-2-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Log Input Form</h2>
            <form className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Session Title"
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    {exercise.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex}>
                            <input
                                placeholder="Exercise Name"
                                value={exercise.name}
                                onChange={(e) => updateExercise(exerciseIndex, 'name', e.target.value)}
                            ></input>


                            {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex}>
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', e.target.value)}
                                    ></input>
                                    <input
                                        type="number"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                                    ></input>
                                </div>

                            ))}
                        </div>


                    ))}

                    <div className="bg-slate-500">
                        <button
                            type="button"
                            onClick={addExercise}
                        ></button>
                        <button
                            type="button"
                            onClick={() => addSet(exercise.length - 1)}
                        ></button>
                    </div>
                </div>
            </form>
        </div>
    )
}




// export const LogInputForm = () => {
//     const [title, setTitle] = useState<string>("");
//     const [exercises, setExercises] = useState<Exercise[]>([]);
//     const [currentExercise, setCurrentExercise] = useState<string>("");
//     const [currentSet, setCurrentSet] = useState<Set[]>([{ weight: 0, reps: 0 }])
//     const [set, setSet] = useState<Set[]>([{ weight: 0, reps: 0 }])

//     const addSet = () => {
//         setCurrentSet([...currentSet, { weight: 0, reps: 0 }])
//     }

//     const handleSetInput = (index: number, field: "weight" | "reps", value: string) => {
//         const updatedSet = [...currentSet];
//         updatedSet[index] = { ...updatedSet[index], [field]: value } //we did this to not completely change the value but only update the field value
//         //lets say if we want to change the [1] weight value, this will only change that value and not make it completely just weight in [1]
//         setCurrentSet(updatedSet);
//     }

//     const addExercise = () => {
//         const newExercise: Exercise = { name: currentExercise, set: currentSet };
//         setExercises([...exercises, newExercise]);
//         setCurrentExercise("");
//         setCurrentSet([{ weight: 0, reps: 0 }])
//     }

//     return <div>
//         <h2>Log Input Form</h2>
//         <form>
//             <div>
//                 <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Session Title"></input>
//             </div>

//             <div>
//                 <div>
//                     <input type="text"
//                         onChange={(e) => setCurrentExercise(e.target.value)}
//                         placeholder="Exercise Name"></input>
//                 </div>

//                 {currentSet.map((setObj, index) => (
//                     <div key={index}>
//                         <input
//                             type="number"
//                             placeholder="weight"
//                             value={setObj.weight}
//                             onChange={(e) => handleSetInput(index, "weight", e.target.value)}
//                         ></input>
//                         <input
//                             type="number"
//                             placeholder="reps"
//                             value={setObj.reps}
//                             onChange={(e) => handleSetInput(index, "reps", e.target.value)}
//                         ></input>
//                     </div>
//                 ))}
//             </div>


//             <button type="button" onClick={addSet}>Add Set</button>

//             <button type="button" onClick={addExercise}>Add Exercise</button>
//         </form>
//     </div>

// }

// const [exercise, setExercise] = useState([" "]);

// const addInputBox = () =>{
//     setExercise([...exercise, ""]);
// }

// const handleInputChange = (index : number, value: string) =>{
//     const newInput = [...exercise];
//     newInput[index] = value;
//     setExercise(newInput)
// }

// return <div>
//     <h2>Log Input Form</h2>
//     <form>
//         {exercise.map((input, index) =>(
//             <div key={index}>
//                 <input
//                 type="text"
//                 placeholder={`Input ${index + 1}`}
//                 value={input}
//                 onChange={(e)=> handleInputChange(index, e.target.value)}></input>
//             </div>
//         ))}
//         <button type="button" onClick={addInputBox}>Add exercise input box</button>
//     </form>
// </div>
