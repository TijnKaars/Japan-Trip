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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-inset-bottom">
      <div className="flex">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 min-h-[56px] gap-1 text-xs transition-colors duration-150 cursor-pointer ${
                actief ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors duration-150 ${actief ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className={`${actief ? 'font-medium' : ''}`}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
