"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatePickersPage() {
  // Single date picker state
  const [date, setDate] = React.useState<Date>()

  // Date range picker state
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  // Month picker state
  const [month, setMonth] = React.useState<Date>()

  // Date with time state
  const [dateTime, setDateTime] = React.useState<Date>()
  const [time, setTime] = React.useState<string>("12:00")

  // Disabled dates state
  const [disabledDate, setDisabledDate] = React.useState<Date>()
  const disabledDays = [
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
    {
      from: new Date(new Date().setDate(new Date().getDate() + 10)),
      to: new Date(new Date().setDate(new Date().getDate() + 15)),
    },
  ]

  // Combined date and time
  React.useEffect(() => {
    if (dateTime) {
      const [hours, minutes] = time.split(":").map(Number)
      const newDateTime = new Date(dateTime)
      newDateTime.setHours(hours, minutes)
      setDateTime(newDateTime)
    }
  }, [time])

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">
        Date Pickers
      </h1>

      <div className="space-y-8" data-testid="date-pickers-container">
        {/* Single Date Picker */}
        <div className="space-y-2" data-testid="date-picker-section">
          <h2 className="text-xl font-semibold" data-testid="section-title">
            Single Date Picker
          </h2>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="single-date" data-testid="date-picker-label">
              Select a date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  data-testid="date-picker-button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" data-testid="date-picker-popover">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  data-testid="date-picker-calendar"
                />
              </PopoverContent>
            </Popover>
            <p data-testid="selected-date-display">Selected date: {date ? format(date, "PPP") : "None"}</p>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2" data-testid="date-range-picker-section">
          <h2 className="text-xl font-semibold" data-testid="section-title">
            Date Range Picker
          </h2>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="date-range" data-testid="date-picker-label">
              Select a date range
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={cn("w-[300px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                  data-testid="date-range-picker-button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" data-testid="date-range-picker-popover">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                  numberOfMonths={2}
                  data-testid="date-range-picker-calendar"
                />
              </PopoverContent>
            </Popover>
            <p data-testid="selected-date-range-display">
              Selected range:{" "}
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                  </>
                ) : (
                  format(dateRange.from, "PPP")
                )
              ) : (
                "None"
              )}
            </p>
          </div>
        </div>

        {/* Month Picker */}
        <div className="space-y-2" data-testid="month-picker-section">
          <h2 className="text-xl font-semibold" data-testid="section-title">
            Month Picker
          </h2>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="month-picker" data-testid="date-picker-label">
              Select a month
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="month-picker"
                  variant={"outline"}
                  className={cn("w-[280px] justify-start text-left font-normal", !month && "text-muted-foreground")}
                  data-testid="month-picker-button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {month ? format(month, "MMMM yyyy") : "Pick a month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" data-testid="month-picker-popover">
                <Calendar
                  mode="single"
                  selected={month}
                  onSelect={setMonth}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={2020}
                  toYear={2030}
                  formatters={{ formatCaption: () => "" }} // Hide the default caption
                  classNames={{
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "hidden", // Hide the default caption label
                    dropdown_month: "w-full",
                    dropdown_year: "w-full",
                    dropdown: "p-1",
                    vhidden: "hidden", // Hide any other redundant elements
                  }}
                  ISOWeek
                  showOutsideDays={false}
                  view="month"
                  data-testid="month-picker-calendar"
                />
              </PopoverContent>
            </Popover>
            <p data-testid="selected-month-display">Selected month: {month ? format(month, "MMMM yyyy") : "None"}</p>
          </div>
        </div>

        {/* Date with Time Picker */}
        <div className="space-y-2" data-testid="date-time-picker-section">
          <h2 className="text-xl font-semibold" data-testid="section-title">
            Date with Time
          </h2>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="date-time" data-testid="date-picker-label">
              Select date and time
            </Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-time"
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dateTime && "text-muted-foreground",
                    )}
                    data-testid="date-time-picker-button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTime ? format(dateTime, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" data-testid="date-time-picker-popover">
                  <Calendar
                    mode="single"
                    selected={dateTime}
                    onSelect={setDateTime}
                    initialFocus
                    data-testid="date-time-picker-calendar"
                  />
                </PopoverContent>
              </Popover>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="w-[180px]" data-testid="time-picker-trigger">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent data-testid="time-picker-content">
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <React.Fragment key={hour}>
                      <SelectItem value={`${hour.toString().padStart(2, "0")}:00`} data-testid="time-option">
                        {hour.toString().padStart(2, "0")}:00
                      </SelectItem>
                      <SelectItem value={`${hour.toString().padStart(2, "0")}:30`} data-testid="time-option">
                        {hour.toString().padStart(2, "0")}:30
                      </SelectItem>
                    </React.Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p data-testid="selected-date-time-display">
              Selected date and time: {dateTime ? format(dateTime, "PPP 'at' p") : "None"}
            </p>
          </div>
        </div>

        {/* Date Picker with Disabled Dates */}
        <div className="space-y-2" data-testid="disabled-dates-picker-section">
          <h2 className="text-xl font-semibold" data-testid="section-title">
            Date Picker with Disabled Dates
          </h2>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="disabled-dates" data-testid="date-picker-label">
              Select a date (some dates disabled)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="disabled-dates"
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !disabledDate && "text-muted-foreground",
                  )}
                  data-testid="disabled-dates-picker-button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {disabledDate ? format(disabledDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" data-testid="disabled-dates-picker-popover">
                <Calendar
                  mode="single"
                  selected={disabledDate}
                  onSelect={setDisabledDate}
                  disabled={disabledDays}
                  initialFocus
                  data-testid="disabled-dates-picker-calendar"
                />
              </PopoverContent>
            </Popover>
            <p data-testid="disabled-dates-info">
              Note: Some dates are disabled for testing purposes (tomorrow, +3 days, +5 days, and a range from +10 to
              +15 days)
            </p>
            <p data-testid="selected-disabled-date-display">
              Selected date: {disabledDate ? format(disabledDate, "PPP") : "None"}
            </p>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
