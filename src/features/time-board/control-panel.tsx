import Calendar from './calendar'
import Category from './category'

const ControlPanel = () => {
  return (
    <aside
      className="border-border-primary bg-background-card flex w-60 flex-col border-r"
      aria-label="컨트롤 패널"
    >
      <Calendar />
      <Category />
    </aside>
  )
}

export default ControlPanel
