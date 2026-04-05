'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Wallet,
  FileText,
} from 'lucide-react'

const navigatie = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/reisschema', label: 'Schema', icon: CalendarDays },
  { href: '/steden', label: 'Steden', icon: MapPin },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/documenten', label: 'Docs', icon: FileText },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 border-t z-50"
      style={{ backgroundColor: '#FAFAFA', borderColor: '#E0E0E0' }}
    >
      <div className="flex">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 min-h-[56px] gap-1 text-xs transition-colors duration-150 cursor-pointer"
              style={{ color: actief ? '#C8102E' : '#6B6B6B' }}
            >
              <Icon className="w-5 h-5" style={{ color: actief ? '#C8102E' : '#6B6B6B' }} />
              <span style={{ fontWeight: actief ? 600 : 400 }}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
