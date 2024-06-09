import { differenceInDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { Progress } from "@/components/ui/progress"

interface MuscleCardProps {
  muscle: { muscleName: string; size: "big" | "small" }
  totalVolume: number
  dateRange: DateRange | undefined
}

export const MuscleCard = ({
  dateRange,
  muscle: { muscleName, size },
  totalVolume,
}: MuscleCardProps) => {
  let days = 1
  if (dateRange && dateRange.to && dateRange.from) {
    days = differenceInDays(dateRange.to, dateRange.from) + 1
    console.log(days)
  }

  function calculateProgress() {
    if (days === 1) return 0
    const dailyReps = totalVolume / days

    const progress =
      size === "big"
        ? Math.round((dailyReps / 12) * 100)
        : Math.round((dailyReps / 6) * 100)

    if (progress > 100) return 100

    return progress
  }

  return (
    <div>
      {/* <div className="flex cursor-pointer items-center justify-between space-x-2 rounded bg-muted p-2 hover:bg-muted-foreground/50"> */}
      <div className="flex justify-between text-xs md:text-sm">
        <div>{muscleName}</div>
        <div>{totalVolume} reps</div>
      </div>
      <Progress value={calculateProgress()} />
    </div>
  )
}
