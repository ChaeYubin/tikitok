import { DayColumn } from './day-column'
import { TimeGridProps } from './time-grid-content'
import { TimeLabels } from './time-labels'
import { WEEKDAYS } from '../../constants'

export const GridBody = ({ baseDates }: TimeGridProps) => (
  <div className="flex">
    <TimeLabels />
    <div className="flex flex-1">
      {WEEKDAYS.map((weekday, index) => (
        <DayColumn key={weekday} weekday={weekday} baseDate={baseDates[index]} />
      ))}
    </div>
  </div>
)
