import NavLinks from './nav-links'

const Header = () => {
  return (
    <div className="flex w-full items-center border-b px-4 py-2">
      <div className="pr-4 text-2xl font-bold">
        <span className="text-brand-primary">Tiki</span>
        <span className="text-brand-secondary">Tok</span>
      </div>
      <NavLinks />
    </div>
  )
}

export default Header
