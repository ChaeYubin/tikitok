import { TimeBlock } from '@/shared/types'
import { cn } from '@/shared/utils'

import { TimeCellInfo } from '../../types'

interface TimeCellProps extends TimeCellInfo {
  onMouseDown: (type: TimeBlock['type']) => void
  onMouseEnter: () => void
  isSelected: boolean
  showBorder: boolean
  dragType: TimeBlock['type']
}

export const TimeCell = ({
  onMouseDown,
  onMouseEnter,
  isSelected,
  showBorder,
  dragType,
}: TimeCellProps) => {
  return (
    <div className="flex min-w-32 shrink-0">
      <div
        onMouseDown={() => onMouseDown('plan')}
        onMouseEnter={onMouseEnter}
        className={cn(
          'border-r-border/50 h-2 flex-1 border-r',
          showBorder && 'border-b',
          isSelected && dragType === 'plan' && 'bg-blue-200'
        )}
      />
      <div
        onMouseDown={() => onMouseDown('log')}
        onMouseEnter={onMouseEnter}
        className={cn(
          'h-2 flex-1 border-r',
          showBorder && 'border-b',
          isSelected && dragType === 'log' && 'bg-red-200'
        )}
      />
    </div>
  )
}
