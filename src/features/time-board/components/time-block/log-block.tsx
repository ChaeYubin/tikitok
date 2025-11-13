import { BlockProps } from '../../types'
import { formatTimeBlockRange } from '../../utils'

export const LogBlock = ({ title, startTime, endTime }: BlockProps) => {
  return (
    <div className="absolute left-0 h-full w-full rounded-sm bg-red-200 p-1">
      <div className="flex flex-col">
        <p className="text-xs">{title}</p>
        <p className="text-2xs">{formatTimeBlockRange(startTime, endTime)}</p>
      </div>
    </div>
  )
}
