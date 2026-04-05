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
  { href: '/reisschema', label: 'Reisschema', icon: CalendarDays },
  { href: '/steden', label: 'Steden & Hotels', icon: MapPin },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/documenten', label: 'Documenten', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden md:flex flex-col w-56 min-h-screen px-3 py-6 shrink-0 border-r"
      style={{ backgroundColor: '#FAFAFA', borderColor: '#E0E0E0' }}
    >
      <div className="mb-8 px-3">
        <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#6B6B6B' }}>
          Japan 2026
        </div>
        <div className="text-sm" style={{ color: '#6B6B6B' }}>Osaka · Kyoto · Tokyo</div>
      </div>
      <nav className="flex flex-col gap-0.5">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer"
              style={actief
                ? { backgroundColor: '#C8102E', color: '#FFFFFF', fontWeight: 600 }
                : { color: '#6B6B6B' }
              }
              onMouseEnter={e => {
                if (!actief) {
                  e.currentTarget.style.backgroundColor = '#F0F0F0'
                  e.currentTarget.style.color = '#1A1A1A'
                }
              }}
              onMouseLeave={e => {
                if (!actief) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#6B6B6B'
                }
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
