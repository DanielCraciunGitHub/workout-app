import { Dispatch, SetStateAction } from "react"
import { endOfMonth, startOfMonth } from "date-fns"
import { debounce } from "lodash"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface WeekPickerProps {
  updateDateRange: Dispatch<SetStateAction<DateRange | undefined>>
  dateRange: DateRange | undefined
}

export const DatePicker = ({ updateDateRange, dateRange }: WeekPickerProps) => {
  const debouncedUpdateDateRange = debounce(updateDateRange, 400)

  return (
    <div>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={debouncedUpdateDateRange}
        weekStartsOn={1}
        month={startOfMonth(dateRange?.from ?? new Date())}
        onMonthChange={(month) =>
          debouncedUpdateDateRange({ from: month, to: endOfMonth(month) })
        }
      />
    </div>
  )
}
