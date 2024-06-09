import { db } from "@/db"
import { userExerciseData, users } from "@/db/schema"
import { addDays, format } from "date-fns"
import { and, between, eq } from "drizzle-orm"
import { DateRange } from "react-day-picker"
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
        dateRange: z.custom<DateRange | undefined>(),
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.dateRange && input.dateRange.to && input.dateRange.from) {
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
              format(input.dateRange?.from!, "yyyy-MM-dd"),
              format(input.dateRange?.to!, "yyyy-MM-dd")
            )
          ),
        })
        return data
      }
      return undefined
    }),
})
