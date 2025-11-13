import { cn } from '@/shared/utils'

import { TimeGridProps } from './time-grid-content'

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

export const GridHeader = ({ baseDates }: TimeGridProps) => {
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
