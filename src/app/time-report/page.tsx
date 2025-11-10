import { Analytics, FilterPanel } from '@/features/time-report/components'

const TimeReportPage = () => {
  return (
    <main className="flex w-full flex-1">
      <FilterPanel />
      <Analytics />
    </main>
  )
}

export default TimeReportPage
