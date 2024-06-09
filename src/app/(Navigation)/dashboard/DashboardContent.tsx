"use client"

import { useEffect, useState } from "react"
import { exerciseConfig } from "@/config"
import { trpc } from "@/server/client"
import { useSession } from "next-auth/react"
import { DateRange } from "react-day-picker"

import { DatePicker } from "./DatePicker"
import { MuscleCard } from "./MuscleCard"

interface DashboardContentProps {}

export const DashboardContent = ({}: DashboardContentProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { data: session } = useSession()
  const {
    data: exerciseData,
    isFetching,
    isError,
  } = trpc.exerciseRouter.getExerciseDataByDateRange.useQuery(
    {
      userId: session?.user.id!,
      dateRange,
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
  useEffect(() => {
    console.log(dateRange)
  }, [dateRange])

  return (
    <div className="flex flex-col">
      <DatePicker updateDateRange={setDateRange} dateRange={dateRange} />
      <div className="space-y-2">
        {exerciseConfig.muscles.map((muscle, i) => {
          let totalVolume = 0

          exerciseData?.map((dataPoint) => {
            if (dataPoint.exercises.muscle === muscle.muscleName) {
              totalVolume += dataPoint.volume
            }
          })

          return (
            <MuscleCard
              key={i}
              dateRange={dateRange}
              muscle={muscle}
              totalVolume={totalVolume}
            />
          )
        })}
      </div>
    </div>
  )
}
