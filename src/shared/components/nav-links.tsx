'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/time-board', label: '타임 보드' },
  { href: '/time-report', label: '타임 리포트' },
]

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-background-card flex gap-1.5 rounded-md p-1.5">
      {navItems.map(item => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-text-brand bg-background-primary shadow dark:bg-white/10'
                : 'text-text-primary hover:bg-gray-200 dark:hover:bg-white/10'
            } `}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavLinks
