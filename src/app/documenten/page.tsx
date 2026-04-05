import { links, notities } from '@/data/documenten'
import { ExternalLink, FileText, Link as LinkIcon } from 'lucide-react'

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
      <h1 className="text-xl font-semibold text-slate-900">Documenten</h1>

      {/* Links */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-slate-400" />
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Links</h2>
        </div>

        {linksPerType.map(({ type, label, items }) => (
          <div key={type} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
            </div>
            <div className="divide-y divide-slate-50">
              {items.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 min-h-[48px] hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 cursor-pointer group"
                >
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 py-3 flex-1 min-w-0 pr-3 leading-snug">
                    {link.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors duration-150 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Tips */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tips</h2>
        </div>

        {[...algemeneTips, ...tipsPerStad].map(notitie => (
          <div key={notitie.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">{notitie.titel}</p>
              {notitie.stad && (
                <span className="text-xs status-idee px-2.5 py-0.5 rounded-full font-medium">{notitie.stad}</span>
              )}
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                {notitie.inhoud}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
