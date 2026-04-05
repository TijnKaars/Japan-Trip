import { dagplannen } from '@/data/dagplannen'
import { steden } from '@/data/steden'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Train, MapPin } from 'lucide-react'

function getStatusKleur(status: string) {
  switch (status) {
    case 'geboekt': return 'bg-green-100 text-green-800'
    case 'gepland': return 'bg-blue-100 text-blue-800'
    case 'idee': return 'bg-gray-100 text-gray-600'
    case 'afgerond': return 'bg-gray-100 text-gray-400'
    default: return 'bg-gray-100 text-gray-600'
  }
}

function getTransportLabel(type: string) {
  const labels: Record<string, string> = {
    vlucht: '✈ Vlucht',
    trein: '🚄 Trein',
    metro: '🚇 Metro',
    taxi: '🚕 Taxi',
    bus: '🚌 Bus',
    lopen: '🚶 Lopen',
  }
  return labels[type] || type
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function ReisschemaPage() {
  const dagenPerStad = steden
    .sort((a, b) => a.volgorde - b.volgorde)
    .map(stad => ({
      stad,
      dagen: dagplannen.filter(d => d.stad === stad.stad).sort((a, b) => a.dagNummer - b.dagNummer),
    }))

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10">
      <h1 className="text-2xl font-semibold text-gray-900">Reisschema</h1>

      {dagenPerStad.map(({ stad, dagen }) => (
        <section key={stad.id}>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-800">{stad.stad}</h2>
            <span className="text-sm text-gray-400">
              {formatDatum(stad.startDatum)} – {formatDatum(stad.eindDatum)}
            </span>
          </div>

          <div className="space-y-4">
            {dagen.map(dag => (
              <Card key={dag.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">Dag {dag.dagNummer}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusKleur(dag.status)}`}>
                          {dag.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{formatDatum(dag.datum)}</div>
                    </div>
                  </div>

                  {/* Activiteiten */}
                  {dag.activiteiten.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Activiteiten</div>
                      <div className="space-y-3">
                        {dag.activiteiten.map((act, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="text-xs text-gray-400 w-20 shrink-0 pt-0.5">{act.startTijd} – {act.eindTijd}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-800">{act.naam}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusKleur(act.status)}`}>
                                  {act.status}
                                </span>
                                {act.kosten > 0 && (
                                  <span className="text-xs text-gray-400">€{act.kosten}</span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {act.locatie}
                              </div>
                              {act.notities && (
                                <div className="text-xs text-gray-500 mt-1 italic">{act.notities}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transport */}
                  {dag.transport.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Transport</div>
                      <div className="space-y-2">
                        {dag.transport.map((tr, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <Train className="w-4 h-4 text-gray-300 shrink-0" />
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded whitespace-nowrap">
                              {getTransportLabel(tr.type)}
                            </span>
                            <span className="text-gray-700">{tr.van} → {tr.naar}</span>
                            <span className="text-gray-400 text-xs whitespace-nowrap">{tr.vertrekTijd} – {tr.aankomstTijd}</span>
                            {tr.kosten > 0 && <span className="text-gray-400 text-xs">€{tr.kosten}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dag.notities && (
                    <p className="text-sm text-gray-500 italic border-t pt-3 mt-3">{dag.notities}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
