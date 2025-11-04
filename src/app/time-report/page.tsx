import Analytics from '@/features/time-report/analytics'
import FilterPanel from '@/features/time-report/filter-panel'

const TimeReportPage = () => {
  return (
    <main className="flex w-full flex-1">
      <FilterPanel />
      <Analytics />
    </main>
  )
}

export default TimeReportPage
