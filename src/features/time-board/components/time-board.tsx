'use client'

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 0~23시

const formatTimeGridHour = (hour: number) => {
  const period = hour < 12 ? 'AM' : 'PM'
  const formatted = hour % 12 === 0 ? 12 : hour % 12

  return `${formatted} ${period}`
}

const FORMATTED_HOURS = HOURS.map(formatTimeGridHour).slice(1)
const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

export const TimeBoard = () => {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col" aria-label="타임 그리드">
      <TimeBoardTitle />
      <TimeGrid />
    </div>
  )
}

const TimeBoardTitle = () => (
  <h1 className="px-4 pt-2 text-xl font-bold select-none">2025년 11월</h1>
)

const TimeGrid = () => (
  <div className="scrollbar-hide bg-background flex min-h-0 min-w-0 flex-col overflow-auto">
    <GridHeader />
    <GridBody />
  </div>
)

const GridHeader = () => (
  <div className="sticky top-0 z-10 flex min-h-7">
    <div className="bg-background w-12 shrink-0 border-b" />
    {WEEKDAYS.map(weekday => (
      <div
        key={weekday}
        className="bg-background flex min-w-32 flex-1 shrink-0 items-center justify-center border-b"
      >
        <p className="text-sm select-none">{weekday}</p>
      </div>
    ))}
  </div>
)

const GridBody = () => (
  <div className="flex">
    <TimeLabels />
    <div className="flex flex-1">
      {WEEKDAYS.map(weekday => (
        <DayColumn key={weekday} weekday={weekday} />
      ))}
    </div>
  </div>
)

const TimeLabels = () => (
  <div className="w-12 shrink-0">
    {FORMATTED_HOURS.map(hour => (
      <div key={hour} className="h-16 pt-14 pr-2 text-right">
        <p className="text-muted-foreground font-mono text-xs select-none">{hour}</p>
      </div>
    ))}
  </div>
)

interface DayColumnProps {
  weekday: string
}

const DayColumn = ({ weekday }: DayColumnProps) => (
  <div className="flex-1">
    {HOURS.map(hour => (
      <TimeCell key={`${weekday}-${hour}`} weekday={weekday} />
    ))}
  </div>
)

type TimeCellProps = DayColumnProps

const TimeCell = ({ weekday }: TimeCellProps) => {
  const handleClick = () => {
    console.log(`Clicked: ${weekday}`)
    // 나중에 여기서 날짜와 시간을 함께 처리 가능
  }

  return (
    <div
      onClick={handleClick}
      className="flex h-16 min-w-32 shrink-0 items-center justify-center border-r border-b last:border-b-0"
    ></div>
  )
}
