export interface TimeBlock {
  id: string
  title: string
  startTime: Date
  endTime: Date
  categoryId?: number
  type: 'plan' | 'log'
  linkedBlockId?: string
  memo?: string
}
