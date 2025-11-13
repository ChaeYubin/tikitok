'use client'

import { set } from 'date-fns/set'
import { useState } from 'react'
import { MouseEvent } from 'react'

import { TimeBlock } from '@/shared/types'
import { cn } from '@/shared/utils'

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
  const [blockType, setBlockType] = useState<TimeBlock['type']>('plan')
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([])

  const onMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    hour: number,
    minute: number,
    type: TimeBlock['type']
  ) => {
    e.preventDefault() // 기본 드래그/텍스트 선택 방지

    setDragging(true)
    setDragStart({ hour, minute })
    setDragEnd({ hour, minute })
    setBlockType(type)
  }

  const onMouseEnter = (hour: number, minute: number) => {
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

      // TODO 기존 타임 블록과 겹치도록 생성하려는 경우 어떻게 처리할 지 결정 후 수정
      // 임시로 겹치는 블록이 있으면 블록 생성 막음
      const hasOverlap = timeBlocks.some(
        block => startTime < block.endTime && endTime > block.startTime && block.type === blockType
      )

      if (hasOverlap) {
        alert('⚠️ 기존 블록과 시간이 겹칩니다.')

        setDragging(false)
        setDragStart(null)
        setDragEnd(null)

        return
      }

      const newBlock: TimeBlock = {
        id: crypto.randomUUID(),
        type: blockType,
        title: 'Block Title',
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
    <div className="relative flex-1" onMouseUp={onMouseUp}>
      {/* 타임 그리드(배경) */}
      {HOURS.map(hour =>
        MINUTES.map(minute => {
          const showBorder = minute === 50 // 1시간 단위 border

          return (
            <TimeCell
              key={`${weekday}-${hour}-${minute}`}
              hour={hour}
              minute={minute}
              onMouseDown={(e, type) => onMouseDown(e, hour, minute, type)}
              onMouseEnter={() => onMouseEnter(hour, minute)}
              isSelected={isCellSelected(hour, minute)}
              dragType={blockType}
              showBorder={showBorder}
            />
          )
        })
      )}

      {/* 타임 블록 */}
      <div>
        {timeBlocks.map(block => {
          const BlockComp = BlockMap[block.type]

          const startMinutes = block.startTime.getHours() * 60 + block.startTime.getMinutes()
          const endMinutes = block.endTime.getHours() * 60 + block.endTime.getMinutes()

          const topPercent = (startMinutes / (24 * 60)) * 100
          const heightPercent = ((endMinutes - startMinutes) / (24 * 60)) * 100

          return (
            <div
              key={block.id}
              className={cn(
                'pointer-events-none absolute top-0 w-1/2',
                block.type === 'plan' ? 'left-0' : 'right-0'
              )}
              style={{ top: `${topPercent}%`, height: `${heightPercent}%` }}
            >
              <BlockComp key={block.id} {...block} isEditing={false} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
