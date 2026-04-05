import { links, taken, notities } from '@/data/documenten'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, CheckSquare, Square, FileText, Link as LinkIcon } from 'lucide-react'

const linkTypeLabels: Record<string, string> = {
  boeking: 'Boekingen',
  kaart: 'Kaarten',
  info: 'Informatie',
  overig: 'Overig',
}

const linkTypeVolgorde = ['boeking', 'kaart', 'info', 'overig']

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

export default function DocumentenPage() {
  const openTaken = taken.filter(t => t.status === 'open')
  const afgeroendeTaken = taken.filter(t => t.status === 'afgerond')

  const linksPerType = linkTypeVolgorde
    .map(type => ({
      type,
      label: linkTypeLabels[type],
      items: links.filter(l => l.type === type),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Documenten</h1>

      {/* Boekingslinks */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <LinkIcon className="w-5 h-5 text-gray-400" />
          Links
        </h2>
        <div className="space-y-4">
          {linksPerType.map(({ type, label, items }) => (
            <Card key={type}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-800 group-hover:text-gray-900">{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 ml-2" />
                  </a>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-gray-400" />
          Checklist
        </h2>

        {openTaken.length > 0 && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Open ({openTaken.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {openTaken
                .sort((a, b) => new Date(a.vervaldatum).getTime() - new Date(b.vervaldatum).getTime())
                .map(taak => (
                  <div key={taak.id} className="flex items-start gap-3">
                    <Square className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
                    <div>
                      <div className="text-sm text-gray-800">{taak.titel}</div>
                      <div className="text-xs text-gray-400">voor {formatDatum(taak.vervaldatum)}</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        {afgeroendeTaken.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Afgerond ({afgeroendeTaken.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {afgeroendeTaken.map(taak => (
                <div key={taak.id} className="flex items-start gap-3">
                  <CheckSquare className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400 line-through">{taak.titel}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </section>

      {/* Notities */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-400" />
          Notities
        </h2>
        <div className="space-y-4">
          {notities.map(notitie => (
            <Card key={notitie.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{notitie.titel}</CardTitle>
                  {notitie.stad && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{notitie.stad}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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
