import { TimeBlock } from '@/shared/types'

export interface BlockProps extends TimeBlock {
  isEditing: boolean
}

export interface TimeCellInfo {
  hour: number
  minute: number
}
