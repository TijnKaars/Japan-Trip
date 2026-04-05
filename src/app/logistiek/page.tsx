import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { Card, CardContent } from '@/components/ui/card'
import { Hotel, Train, ExternalLink, ArrowRight } from 'lucide-react'
import type { Transport } from '@/lib/types'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getTransportLabel(type: string) {
  const labels: Record<string, string> = {
    vlucht: 'Vlucht',
    trein: 'Trein',
    metro: 'Metro',
    taxi: 'Taxi',
    bus: 'Bus',
    lopen: 'Lopen',
  }
  return labels[type] || type
}

function getTransportKleur(type: string) {
  switch (type) {
    case 'vlucht': return 'bg-blue-100 text-blue-800'
    case 'trein': return 'bg-green-100 text-green-800'
    case 'metro': return 'bg-purple-100 text-purple-800'
    case 'bus': return 'bg-yellow-100 text-yellow-800'
    case 'taxi': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-600'
  }
}

export default function LogistiekPage() {
  // Alle transport chronologisch
  const alleTransport: Array<Transport & { datum: string; dagNummer: number; stad: string }> = dagplannen
    .flatMap(dag =>
      dag.transport.map(tr => ({
        ...tr,
        datum: dag.datum,
        dagNummer: dag.dagNummer,
        stad: dag.stad,
      }))
    )
    .sort((a, b) => {
      const datumVerschil = new Date(a.datum).getTime() - new Date(b.datum).getTime()
      if (datumVerschil !== 0) return datumVerschil
      return a.vertrekTijd.localeCompare(b.vertrekTijd)
    })

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Logistiek</h1>

      {/* Hotels sectie */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Hotel className="w-5 h-5 text-gray-400" />
          Hotels
        </h2>
        <div className="space-y-3">
          {steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => (
            <Card key={stad.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900">{stad.hotel.naam}</div>
                    <div className="text-sm text-gray-500">{stad.stad} · {stad.hotel.adres}</div>
                    <div className="text-sm text-gray-500">
                      {formatDatum(stad.hotel.checkIn)} → {formatDatum(stad.hotel.checkOut)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-semibold text-gray-900">€{stad.hotel.prijsTotaal.toLocaleString('nl-NL')}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">geboekt</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Bevestiging:</span>
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{stad.hotel.bevestigingsCode}</span>
                  </div>
                  <a
                    href={stad.hotel.boekingslink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline ml-auto"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Boeking
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Transport sectie */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Train className="w-5 h-5 text-gray-400" />
          Transport
        </h2>
        {alleTransport.length === 0 ? (
          <p className="text-sm text-gray-500">Nog geen transport ingepland.</p>
        ) : (
          <div className="space-y-3">
            {alleTransport.map((tr, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-xs text-gray-400 whitespace-nowrap pt-0.5 w-24 shrink-0">
                      <div>{formatDatum(tr.datum)}</div>
                      <div className="mt-0.5">Dag {tr.dagNummer}</div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTransportKleur(tr.type)}`}>
                          {getTransportLabel(tr.type)}
                        </span>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                          {tr.van}
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          {tr.naar}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{tr.vertrekTijd} – {tr.aankomstTijd}</span>
                        {tr.kosten > 0 && <span>€{tr.kosten}</span>}
                        {tr.kosten === 0 && <span className="text-green-600">Inbegrepen in JR Pass</span>}
                      </div>
                      {tr.notities && (
                        <div className="text-xs text-gray-400 italic">{tr.notities}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
