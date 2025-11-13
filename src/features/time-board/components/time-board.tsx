'use client'

import { set } from 'date-fns/set'
import { useState } from 'react'

import { TimeBlock } from '@/shared/types'
import { cn } from '@/shared/utils'

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 0, 1, ..., 23
const MINUTES = Array.from({ length: 6 }, (_, i) => i * 10) // 0, 10, ... 50

const FORMATTED_HOURS = HOURS.map(
  h => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? 'AM' : 'PM'}`
).slice(1)
const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

export const TimeBoard = () => {
  // 한 주 단위 날짜 배열
  const today = new Date()
  const baseDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - today.getDay() + i + 1) // ISO 기준 월요일 시작

    return date
  })

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col" aria-label="타임 그리드">
      <TimeBoardTitle />
      <TimeGrid baseDates={baseDates} />
    </div>
  )
}

const TimeBoardTitle = () => (
  <h1 className="px-4 pt-2 text-xl font-bold select-none">2025년 11월</h1>
)

interface TimeGridProps {
  baseDates: Date[]
}

const TimeGrid = ({ baseDates }: TimeGridProps) => (
  <div className="scrollbar-hide bg-background flex min-h-0 min-w-0 flex-col overflow-auto">
    <GridHeader baseDates={baseDates} />
    <GridBody baseDates={baseDates} />
  </div>
)

const GridHeader = ({ baseDates }: TimeGridProps) => {
  const today = new Date().getDate()

  return (
    <div className="sticky top-0 z-10 flex min-h-7">
      <div className="bg-background w-12 shrink-0 border-b" />
      {WEEKDAYS.map((weekday, index) => (
        <div
          key={weekday}
          className="bg-background flex min-w-32 flex-1 shrink-0 items-center justify-center border-b"
        >
          <p className="text-sm select-none">
            {weekday}
            <span
              className={cn(
                'ml-1 text-sm',
                today === baseDates[index].getDate() &&
                  'rounded-md bg-red-500 px-1 py-0.5 text-neutral-100 dark:bg-red-400'
              )}
            >
              {baseDates[index].getDate()}
            </span>
          </p>
        </div>
      ))}
    </div>
  )
}

const GridBody = ({ baseDates }: TimeGridProps) => (
  <div className="flex">
    <TimeLabels />
    <div className="flex flex-1">
      {WEEKDAYS.map((weekday, index) => (
        <DayColumn key={weekday} weekday={weekday} baseDate={baseDates[index]} />
      ))}
    </div>
  </div>
)

const TimeLabels = () => (
  <div className="w-12 shrink-0">
    {FORMATTED_HOURS.map(hour => (
      <div key={hour} className="h-12 pt-10 pr-2 text-right">
        <p className="text-muted-foreground font-mono text-xs select-none">{hour}</p>
      </div>
    ))}
  </div>
)

interface DayColumnProps {
  weekday: string
  baseDate: Date
}

interface TimeCellInfo {
  hour: number
  minute: number
}

const DayColumn = ({ weekday, baseDate }: DayColumnProps) => {
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState<TimeCellInfo | null>(null)
  const [dragEnd, setDragEnd] = useState<TimeCellInfo | null>(null)
  const [dragType, setDragType] = useState<TimeBlock['type']>('plan')
  const [blocks, setBlocks] = useState<TimeBlock[]>([])

  const onMouseDown = (hour: number, minute: number, type: TimeBlock['type']) => {
    setDragging(true)
    setDragStart({ hour, minute })
    setDragEnd({ hour, minute })
    setDragType(type)
  }

  const handleMouseEnter = (hour: number, minute: number) => {
    if (dragging) setDragEnd({ hour, minute })
  }

  const onMouseUp = () => {
    if (dragStart && dragEnd) {
      const startTotal = dragStart.hour * 60 + dragStart.minute
      const endTotal = dragEnd.hour * 60 + dragEnd.minute

      const startHour = Math.floor(Math.min(startTotal, endTotal) / 60)
      const startMinute = Math.min(startTotal, endTotal) % 60
      const endHour = Math.floor(Math.max(startTotal, endTotal) / 60)
      const endMinute = Math.max(startTotal, endTotal) % 60

      const startTime = set(baseDate, {
        hours: startHour,
        minutes: startMinute,
        seconds: 0,
        milliseconds: 0,
      })
      const endTime = set(baseDate, {
        hours: endHour,
        minutes: endMinute,
        seconds: 0,
        milliseconds: 0,
      })

      const newBlock: TimeBlock = {
        id: crypto.randomUUID(),
        type: dragType,
        title: '',
        startTime,
        endTime,
      }

      setBlocks(prev => [...prev, newBlock])
      console.log('Created Time block')
      console.log(newBlock)
    }

    setDragging(false)
    setDragStart(null)
    setDragEnd(null)
  }

  const isCellSelected = (hour: number, minute: number) => {
    if (!dragStart || !dragEnd) return false

    const cellTotal = hour * 60 + minute
    const startTotal = dragStart.hour * 60 + dragStart.minute
    const endTotal = dragEnd.hour * 60 + dragEnd.minute

    return (
      cellTotal >= Math.min(startTotal, endTotal) && cellTotal <= Math.max(startTotal, endTotal)
    )
  }

  return (
    <div className="flex-1" onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      {HOURS.map(hour =>
        MINUTES.map(minute => {
          const showBorder = minute === 50 // 1시간 단위 border

          return (
            <TimeCell
              key={`${weekday}-${hour}-${minute}`}
              hour={hour}
              minute={minute}
              onMouseDown={type => onMouseDown(hour, minute, type)}
              onMouseEnter={() => handleMouseEnter(hour, minute)}
              isSelected={isCellSelected(hour, minute)}
              dragType={dragType}
              showBorder={showBorder}
            />
          )
        })
      )}
    </div>
  )
}

interface TimeCellProps extends TimeCellInfo {
  onMouseDown: (type: TimeBlock['type']) => void
  onMouseEnter: () => void
  isSelected: boolean
  showBorder: boolean
  dragType: TimeBlock['type']
}

const TimeCell = ({
  onMouseDown,
  onMouseEnter,
  isSelected,
  showBorder,
  dragType,
}: TimeCellProps) => {
  return (
    <div className="flex min-w-32 shrink-0">
      <div
        onMouseDown={() => onMouseDown('plan')}
        onMouseEnter={onMouseEnter}
        className={cn(
          'border-r-border/50 h-2 flex-1 border-r',
          showBorder && 'border-b',
          isSelected && dragType === 'plan' && 'bg-blue-200'
        )}
      />
      <div
        onMouseDown={() => onMouseDown('log')}
        onMouseEnter={onMouseEnter}
        className={cn(
          'h-2 flex-1 border-r',
          showBorder && 'border-b',
          isSelected && dragType === 'log' && 'bg-red-200'
        )}
      />
    </div>
  )
}
