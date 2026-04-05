import { links, notities } from '@/data/documenten'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const tipsPerStad = notities.filter(n => n.stad)
  const algemeneTips = notities.filter(n => !n.stad)

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Documenten</h1>

      {/* Boekingslinks */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3">
          <LinkIcon className="w-4 h-4" />
          Links
        </h2>
        <div className="space-y-3">
          {linksPerType.map(({ type, label, items }) => (
            <Card key={type}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-0.5">
                {items.map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 ml-2" />
                  </a>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips per stad */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4" />
          Tips
        </h2>
        <div className="space-y-3">
          {[...algemeneTips, ...tipsPerStad].map(notitie => (
            <Card key={notitie.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-gray-700">{notitie.titel}</CardTitle>
                  {notitie.stad && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{notitie.stad}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {notitie.inhoud}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
