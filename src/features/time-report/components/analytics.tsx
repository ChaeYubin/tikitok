import { AchievementTrend } from './achievement-trend'
import { CategoryAchievementChart } from './category-achievement-chart'
import { CategoryUsageChart } from './category-usage-chart'
import { OverallProgress } from './overall-progress'

export const Analytics = () => {
  return (
    <div className="flex w-full flex-1 flex-col" aria-label="통계 및 분석">
      <OverallProgress />
      <AchievementTrend />
      <div className="flex flex-2/3 flex-col gap-4 lg:flex-row">
        <CategoryAchievementChart />
        <CategoryUsageChart />
      </div>
    </div>
  )
}
