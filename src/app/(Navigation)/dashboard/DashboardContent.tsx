"use client"

import { useEffect, useState } from "react"
import { exerciseConfig } from "@/config"
import { trpc } from "@/server/client"
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from "date-fns"
import { useSession } from "next-auth/react"
import { DateRange } from "react-day-picker"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePicker } from "./DatePicker"
import { MuscleCard } from "./MuscleCard"

interface DashboardContentProps {}

export const DashboardContent = ({}: DashboardContentProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
    to: endOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  })
  const { data: session } = useSession()
  const { data: exerciseData } =
    trpc.exerciseRouter.getExerciseDataByDateRange.useQuery(
      {
        userId: session?.user.id!,
        dateRange:
          dateRange && dateRange.to && dateRange.from
            ? {
                from: format(dateRange.from, "yyyy-MM-dd HH:mm:ss"),
                to: format(dateRange.to, "yyyy-MM-dd HH:mm:ss"),
              }
            : undefined,
      },
      {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    )

  return (
    <div className="mt-4 flex flex-col">
      <Select
        defaultValue="0"
        onValueChange={(value) => {
          switch (value) {
            case "0":
              setDateRange({
                from: startOfWeek(new Date(), {
                  weekStartsOn: 1,
                }),
                to: endOfWeek(new Date(), {
                  weekStartsOn: 1,
                }),
              })
              break
            case "1":
              setDateRange({
                from: subWeeks(
                  startOfWeek(new Date(), {
                    weekStartsOn: 1,
                  }),
                  1
                ),
                to: subWeeks(
                  endOfWeek(new Date(), {
                    weekStartsOn: 1,
                  }),
                  1
                ),
              })
              break
            case "2":
              setDateRange({
                from: startOfMonth(new Date()),
                to: endOfMonth(new Date()),
              })
              break
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="0">This Week</SelectItem>
          <SelectItem value="1">Last Week</SelectItem>
          <SelectItem value="2">This Month</SelectItem>
        </SelectContent>
      </Select>
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
