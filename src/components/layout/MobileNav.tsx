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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex">
        {navigatie.map(({ href, label, icon: Icon }) => {
          const actief = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 text-xs transition-colors ${
                actief ? 'text-gray-900 font-medium' : 'text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${actief ? 'text-gray-900' : 'text-gray-400'}`} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
