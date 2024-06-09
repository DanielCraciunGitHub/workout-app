"use server"

import { db } from "@/db"
import { exercises, userExerciseData } from "@/db/schema"
import { env } from "@/env.mjs"
import { like } from "drizzle-orm"

const apiUrl = "https://api.api-ninjas.com/v1/exercises"

// export const transferExercises = async () => {
//   const exercisesData: ExerciseRaw[] = []
//   let i = 1
//   let offset = 0
//   while (true) {
//     const res = await fetch(`${apiUrl}?offset=${offset}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Api-Key": env.EXERCISES_API_KEY,
//       },
//     })
//     const exercises: ExerciseRaw[] = await res.json()
//     exercisesData.push(...exercises)
//     console.log("LOG #" + i)

//     if (exercises.length < 10) {
//       break
//     }
//     offset += 10
//     i++
//   }

//   const parsedExercisesData: Exercise[] = exercisesData.map((exercise) => {
//     const { instructions, equipment, type, ...rest } = exercise
//     return rest
//   })

//   await db.insert(exercises).values(parsedExercisesData)

//   return parsedExercisesData.length
// }
export const getExercisesByName = async (name: string, limit: number) => {
  console.log(name)
  const fetchedExercises = await db
    .selectDistinct()
    .from(exercises)
    .where(like(exercises.name, `%${name !== "" ? name : "press"}%`))
    .limit(limit)

  return fetchedExercises
}

type SubmitExerciseProps = {
  volume: number
  userId: string | undefined
  exerciseId: string
}
export const submitExercise = async ({
  exerciseId,
  userId,
  volume,
}: SubmitExerciseProps) => {
  if (userId) {
    await db.insert(userExerciseData).values({ exerciseId, userId, volume })
  }
}
