'use client'

import { TimeGridContent } from './time-grid-content'
import { TimeGridTitle } from './time-grid-title'

export const TimeGrid = () => {
  // 한 주 단위 날짜 배열
  const today = new Date()
  const baseDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - today.getDay() + 1 + i) // ISO 기준 월요일 시작

    return date
  })

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col" aria-label="타임 그리드">
      <TimeGridTitle />
      <TimeGridContent baseDates={baseDates} />
    </div>
  )
}
