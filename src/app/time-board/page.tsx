import { ControlPanel, DetailPanel, TimeGrid } from '@/features/time-board/components'

const TimeBoardPage = () => {
  return (
    <>
      <main className="flex h-full w-full">
        <ControlPanel />
        <TimeGrid />
        <DetailPanel />
      </main>
    </>
  )
}

export default TimeBoardPage
