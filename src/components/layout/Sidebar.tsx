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
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-slate-200 px-3 py-6 shrink-0">
      <div className="mb-8 px-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Japan 2026</div>
        <div className="text-sm text-slate-500">Osaka · Kyoto · Tokyo</div>
      </div>
      <nav className="flex flex-col gap-0.5">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer ${
                actief
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
