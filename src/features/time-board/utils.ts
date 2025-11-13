import { formatDateTo12HourTime } from '@/shared/utils'

export const formatTimeBlockRange = (startTime: Date, endTime: Date) => {
  const start = formatDateTo12HourTime(startTime)
  const end = formatDateTo12HourTime(endTime)

  const startParts = start.split(' ')
  const endParts = end.split(' ')

  // AM/PM이 같으면 start의 AM/PM 제거
  if (startParts[1] === endParts[1]) return `${startParts[0]} - ${end}`

  return `${start} - ${end}`
}
