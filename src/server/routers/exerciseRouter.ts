import { db } from "@/db"
import { userExerciseData } from "@/db/schema"
import { and, between, eq } from "drizzle-orm"
import { z } from "zod"

import { getExercisesByName } from "@/app/_actions/exercises"

import { publicProcedure, router } from "../trpc"

export const exerciseRouter = router({
  getExercisesByName: publicProcedure
    .input(z.object({ name: z.string(), limit: z.number() }))
    .query(async ({ input }) => {
      return await getExercisesByName(input.name, input.limit)
    }),

  getExerciseDataByDateRange: publicProcedure
    .input(
      z.object({
        dateRange: z.custom<{ from: string; to: string } | undefined>(),
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.dateRange && input.dateRange.to && input.dateRange.from) {
        console.log(input.dateRange)
        const data = await db.query.userExerciseData.findMany({
          columns: {
            volume: true,
            date: true,
          },
          with: {
            exercises: {
              columns: {
                muscle: true,
              },
            },
          },
          where: and(
            eq(userExerciseData.userId, input.userId),
            between(
              userExerciseData.date,
              input.dateRange.from,
              input.dateRange.to
            )
          ),
        })
        return data
      }
      return null
    }),
})
