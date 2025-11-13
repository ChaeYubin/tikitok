import { format } from 'date-fns/format'

export const formatDateTo12HourTime = (date: Date) => format(date, 'h:mm a')
