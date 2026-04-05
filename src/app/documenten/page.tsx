import { links, notities } from '@/data/documenten'
import { ExternalLink, FileText, Link as LinkIcon } from 'lucide-react'

const JP_TEXT = '#1A1A1A'
const JP_MUTED = '#6B6B6B'
const JP_CARD = '#F0F0F0'
const JP_BORDER = '#E0E0E0'

const linkTypeLabels: Record<string, string> = {
  boeking: 'Boekingen',
  kaart: 'Kaarten',
  info: 'Informatie',
  overig: 'Overig',
}

const linkTypeVolgorde = ['boeking', 'kaart', 'info', 'overig']

export default function DocumentenPage() {
  const linksPerType = linkTypeVolgorde
    .map(type => ({
      type,
      label: linkTypeLabels[type],
      items: links.filter(l => l.type === type),
    }))
    .filter(g => g.items.length > 0)

  const algemeneTips = notities.filter(n => !n.stad)
  const tipsPerStad = notities.filter(n => n.stad)

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-6">
      <h1 className="text-xl font-bold" style={{ color: JP_TEXT }}>Documenten</h1>

      {/* Links */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4" style={{ color: JP_MUTED }} />
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>Links</h2>
        </div>

        {linksPerType.map(({ type, label, items }) => (
          <div
            key={type}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
          >
            <div className="px-5 py-3" style={{ borderBottom: `1px solid ${JP_BORDER}` }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>{label}</p>
            </div>
            <div>
              {items.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 min-h-[52px] transition-colors duration-150 cursor-pointer group hover:bg-[#E0E0E0]"
                  style={{
                    borderBottom: index < items.length - 1 ? `1px solid ${JP_BORDER}` : 'none',
                  }}
                >
                  <span className="text-sm py-3 flex-1 min-w-0 pr-3 leading-snug" style={{ color: JP_TEXT }}>
                    {link.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 transition-colors duration-150" style={{ color: JP_MUTED }} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Tips */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" style={{ color: JP_MUTED }} />
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>Tips</h2>
        </div>

        {[...algemeneTips, ...tipsPerStad].map(notitie => (
          <div
            key={notitie.id}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
          >
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${JP_BORDER}` }}
            >
              <p className="text-sm font-bold" style={{ color: JP_TEXT }}>{notitie.titel}</p>
              {notitie.stad && (
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: JP_BORDER, color: JP_MUTED }}
                >
                  {notitie.stad}
                </span>
              )}
            </div>
            <div className="px-5 py-4">
              <p className="text-sm whitespace-pre-line leading-relaxed" style={{ color: JP_MUTED }}>
                {notitie.inhoud}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
