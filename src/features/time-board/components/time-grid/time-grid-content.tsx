import { GridBody } from './grid-body'
import { GridHeader } from './grid-header'

export interface TimeGridProps {
  baseDates: Date[]
}

export const TimeGridContent = ({ baseDates }: TimeGridProps) => (
  <div className="scrollbar-hide bg-background flex min-h-0 min-w-0 flex-col overflow-auto">
    <GridHeader baseDates={baseDates} />
    <GridBody baseDates={baseDates} />
  </div>
)
