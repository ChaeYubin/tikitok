export const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

export const HOURS = Array.from({ length: 24 }, (_, i) => i) // 0, 1, ..., 23
export const MINUTES = Array.from({ length: 6 }, (_, i) => i * 10) // 0, 10, ... 50

export const FORMATTED_HOURS_FOR_TIME_LABEL = HOURS.map(
  h => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? 'AM' : 'PM'}`
).slice(1)
