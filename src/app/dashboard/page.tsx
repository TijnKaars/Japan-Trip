import { reis } from '@/data/reis'
import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { uitgaven } from '@/data/budget'
import { taken } from '@/data/documenten'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Hotel, Clock, Train, CheckSquare, Wallet, Calendar } from 'lucide-react'

function getStatusKleur(status: string) {
  switch (status) {
    case 'geboekt': return 'bg-green-100 text-green-800'
    case 'gepland': return 'bg-blue-100 text-blue-800'
    case 'idee': return 'bg-gray-100 text-gray-600'
    case 'afgerond': return 'bg-gray-100 text-gray-400 line-through'
    default: return 'bg-gray-100 text-gray-600'
  }
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

function berekenDagInfo() {
  const vandaag = new Date()
  const startDatum = new Date(reis.startDatum)
  const eindDatum = new Date(reis.eindDatum)

  if (vandaag < startDatum) {
    const dagTot = Math.ceil((startDatum.getTime() - vandaag.getTime()) / (1000 * 60 * 60 * 24))
    return { fase: 'voor' as const, dagTot, huidigeDag: dagplannen[0] }
  }

  if (vandaag > eindDatum) {
    return { fase: 'na' as const, dagTot: 0, huidigeDag: null }
  }

  const dagNummer = Math.floor((vandaag.getTime() - startDatum.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const huidigeDag = dagplannen.find(d => d.dagNummer === dagNummer) || dagplannen[0]
  return { fase: 'tijdens' as const, dagTot: 0, huidigeDag }
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

export default function DashboardPage() {
  const { fase, dagTot, huidigeDag } = berekenDagInfo()

  const huidigeSt = huidigeDag ? steden.find(s => s.stad === huidigeDag.stad) : null

  const komendeDagen = huidigeDag
    ? dagplannen
        .filter(d => d.dagNummer > huidigeDag.dagNummer)
        .slice(0, 3)
    : []

  const totaalGeboekt = uitgaven.filter(u => u.geboekt).reduce((s, u) => s + u.bedrag, 0)
  const totaalGeschat = uitgaven.filter(u => !u.geboekt).reduce((s, u) => s + u.bedrag, 0)
  const totaalAlles = totaalGeboekt + totaalGeschat

  const openTaken = taken.filter(t => t.status === 'open').slice(0, 5)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Reisinfo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Japan september 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Osaka · Kyoto · Tokyo
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDatum(reis.startDatum)} – {formatDatum(reis.eindDatum)}
            </div>
            <div className="flex items-center gap-1.5 font-medium text-gray-900">
              {fase === 'voor' && (
                <span>Nog {dagTot} {dagTot === 1 ? 'dag' : 'dagen'} tot vertrek</span>
              )}
              {fase === 'tijdens' && (
                <span className="text-green-700">Onderweg! Dag {huidigeDag?.dagNummer} van 14</span>
              )}
              {fase === 'na' && (
                <span className="text-gray-500">Reis afgerond</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vandaag */}
      {huidigeDag && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {fase === 'voor' ? 'Dag 1 — preview' : fase === 'tijdens' ? 'Vandaag' : 'Laatste dag'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Dag {huidigeDag.dagNummer}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusKleur(huidigeDag.status)}`}>
                  {huidigeDag.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {huidigeDag.stad} · {formatDatum(huidigeDag.datum)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hotel */}
            {huidigeSt && (
              <div className="flex items-start gap-2 text-sm">
                <Hotel className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                <div>
                  <span className="font-medium">{huidigeSt.hotel.naam}</span>
                  <span className="text-gray-500 ml-2">Check-in {huidigeSt.hotel.checkIn === huidigeDag.datum ? '✓' : ''}</span>
                </div>
              </div>
            )}

            {/* Activiteiten */}
            {huidigeDag.activiteiten.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Activiteiten</div>
                <div className="space-y-2">
                  {huidigeDag.activiteiten.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Clock className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{act.naam}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusKleur(act.status)}`}>
                            {act.status}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">
                          {act.startTijd} – {act.eindTijd} · {act.locatie}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transport */}
            {huidigeDag.transport.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Transport</div>
                <div className="space-y-2">
                  {huidigeDag.transport.map((tr, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Train className="w-4 h-4 text-gray-300 shrink-0" />
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{getTransportLabel(tr.type)}</span>
                      <span>{tr.van} → {tr.naar}</span>
                      <span className="text-gray-500 text-xs">{tr.vertrekTijd}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {huidigeDag.notities && (
              <p className="text-sm text-gray-500 italic">{huidigeDag.notities}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Komende 3 dagen */}
      {komendeDagen.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Komende dagen</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {komendeDagen.map(dag => (
              <Card key={dag.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Dag {dag.dagNummer}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusKleur(dag.status)}`}>{dag.status}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">{formatDatum(dag.datum)} · {dag.stad}</div>
                <div className="space-y-1">
                  {dag.activiteiten.slice(0, 2).map((act, i) => (
                    <div key={i} className="text-xs text-gray-600 truncate">· {act.naam}</div>
                  ))}
                  {dag.activiteiten.length > 2 && (
                    <div className="text-xs text-gray-400">+{dag.activiteiten.length - 2} meer</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Budget + Taken */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Budget samenvatting */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Geboekt</span>
              <span className="font-medium text-green-700">€{totaalGeboekt.toLocaleString('nl-NL')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Geschat</span>
              <span className="font-medium text-blue-600">€{totaalGeschat.toLocaleString('nl-NL')}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-sm font-semibold">
              <span>Totaal</span>
              <span>€{totaalAlles.toLocaleString('nl-NL')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Per persoon</span>
              <span>±€{Math.round(totaalAlles / reis.reizigers).toLocaleString('nl-NL')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Openstaande taken */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Openstaande taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            {openTaken.length === 0 ? (
              <p className="text-sm text-gray-500">Alle taken afgerond!</p>
            ) : (
              <ul className="space-y-2">
                {openTaken.map(taak => (
                  <li key={taak.id} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 rounded border border-gray-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-gray-800">{taak.titel}</div>
                      <div className="text-xs text-gray-400">voor {formatDatum(taak.vervaldatum)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
