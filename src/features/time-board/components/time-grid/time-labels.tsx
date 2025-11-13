import { FORMATTED_HOURS_FOR_TIME_LABEL } from '../../constants'

export const TimeLabels = () => {
  return (
    <div className="w-12 shrink-0">
      {FORMATTED_HOURS_FOR_TIME_LABEL.map(hour => (
        <div key={hour} className="h-12 pt-10 pr-2 text-right">
          <p className="text-muted-foreground font-mono text-xs select-none">{hour}</p>
        </div>
      ))}
    </div>
  )
}
