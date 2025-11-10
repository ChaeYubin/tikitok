import { ControlPanel, DetailPanel, TimeBoard } from '@/features/time-board/components'

const TimeBoardPage = () => {
  return (
    <>
      <main className="flex h-full w-full">
        <ControlPanel />
        <TimeBoard />
        <DetailPanel />
      </main>
    </>
  )
}

export default TimeBoardPage
