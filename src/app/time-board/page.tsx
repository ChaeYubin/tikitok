import ControlPanel from '@/features/time-board/control-panel'
import DetailPanel from '@/features/time-board/detail-panel'
import TimeGrid from '@/features/time-board/time-grid'

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
