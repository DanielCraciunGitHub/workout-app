import { debounce } from "lodash"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface WeekPickerProps {
  updateDateRange: SelectRangeEventHandler
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
      />
    </div>
  )
}
