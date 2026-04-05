'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Train,
  Wallet,
  FileText,
} from 'lucide-react'

const navigatie = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/reisschema', label: 'Reisschema', icon: CalendarDays },
  { href: '/steden', label: 'Steden', icon: MapPin },
  { href: '/logistiek', label: 'Logistiek', icon: Train },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/documenten', label: 'Documenten', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-gray-100 px-3 py-6 shrink-0">
      <div className="mb-8 px-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Japan 2026</div>
        <div className="text-sm text-gray-600 mt-0.5">Osaka · Kyoto · Tokyo</div>
      </div>
      <nav className="flex flex-col gap-1">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                actief
                  ? 'bg-gray-900 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
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
