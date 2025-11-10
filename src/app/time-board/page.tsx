import { ControlPanel, DetailPanel, TimeGrid } from '@/features/time-board/components'

const TimeBoardPage = () => {
  return (
    <>
      <main className="flex w-full flex-1">
        <ControlPanel />
        <TimeGrid />
        <DetailPanel />
      </main>
    </>
  )
}

export default TimeBoardPage
