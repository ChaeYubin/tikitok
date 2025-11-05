import Calendar from './calendar'
import Category from './category'

const ControlPanel = () => {
  return (
    <aside className="bg-sidebar-accent flex w-60 flex-col border-r" aria-label="컨트롤 패널">
      <Calendar />
      <Category />
    </aside>
  )
}

export default ControlPanel
