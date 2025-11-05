'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

const navItems = [
  { href: '/time-board', label: '타임 보드' },
  { href: '/time-report', label: '타임 리포트' },
]

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <nav>
      <Tabs defaultValue={pathname}>
        <TabsList>
          {navItems.map(item => (
            <TabsTrigger key={item.href} value={item.href} asChild>
              <Link href={item.href}>{item.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}

export default NavLinks
