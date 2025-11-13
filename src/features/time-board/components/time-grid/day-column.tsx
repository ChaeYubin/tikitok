'use client'

import { set } from 'date-fns/set'
import { useState } from 'react'

import { TimeBlock } from '@/shared/types'

import { TimeCell } from './time-cell'
import { HOURS, MINUTES } from '../../constants'
import { TimeCellInfo } from '../../types'
import { LogBlock } from '../time-block/log-block'
import { PlanBlock } from '../time-block/plan-block'

const BlockMap = {
  plan: PlanBlock,
  log: LogBlock,
} as const

interface DayColumnProps {
  weekday: string
  baseDate: Date
}

export const DayColumn = ({ weekday, baseDate }: DayColumnProps) => {
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState<TimeCellInfo | null>(null)
  const [dragEnd, setDragEnd] = useState<TimeCellInfo | null>(null)
  const [dragType, setDragType] = useState<TimeBlock['type']>('plan')
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])

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

      setTimeBlocks(prev => [...prev, newBlock])
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
    <div className="relative flex-1" onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
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
