import { reis } from '@/data/reis'
import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { uitgaven } from '@/data/budget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Hotel, Clock, Train } from 'lucide-react'

function getStatusKleur(status: string) {
  switch (status) {
    case 'gepland': return 'bg-blue-100 text-blue-800'
    case 'idee': return 'bg-gray-100 text-gray-600'
    case 'afgerond': return 'bg-gray-100 text-gray-400 line-through'
    default: return 'bg-gray-100 text-gray-600'
  }
}

function getTransportLabel(type: string) {
  const labels: Record<string, string> = {
    vlucht: 'Vlucht', trein: 'Trein', metro: 'Metro',
    taxi: 'Taxi', bus: 'Bus', lopen: 'Lopen',
  }
  return labels[type] || type
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatDatumKort(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

function berekenFase() {
  const vandaag = new Date()
  vandaag.setHours(0, 0, 0, 0)
  const startDatum = new Date(reis.startDatum)
  startDatum.setHours(0, 0, 0, 0)
  const eindDatum = new Date(reis.eindDatum)
  eindDatum.setHours(23, 59, 59, 999)

  if (vandaag < startDatum) {
    const dagTot = Math.ceil((startDatum.getTime() - vandaag.getTime()) / (1000 * 60 * 60 * 24))
    return { fase: 'voor' as const, dagTot }
  }
  if (vandaag > eindDatum) {
    return { fase: 'na' as const, dagTot: 0 }
  }
  const dagNummer = Math.floor((vandaag.getTime() - startDatum.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return { fase: 'tijdens' as const, dagTot: 0, dagNummer }
}

export default function DashboardPage() {
  const { fase, dagTot, dagNummer } = berekenFase()

  // Na de reis
  if (fase === 'na') {
    return (
      <div className="p-6 max-w-2xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">🎌</div>
          <h1 className="text-2xl font-semibold text-gray-900">Reis afgerond</h1>
          <p className="text-gray-500">September 2026 · Osaka · Kyoto · Tokyo</p>
        </div>
      </div>
    )
  }

  // Voor de reis
  if (fase === 'voor') {
    const totaalGeschat = uitgaven.reduce((s, u) => s + u.bedrag, 0)
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-5">
        {/* Hero */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Nog</p>
              <p className="text-7xl font-bold text-gray-900 tabular-nums">{dagTot}</p>
              <p className="text-lg text-gray-500">dagen tot Japan</p>
              <p className="text-sm text-gray-400 mt-2">Vertrek {formatDatum(reis.startDatum)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Route */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {steden.map((stad, i) => (
                <div key={stad.id} className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-gray-900">{stad.stad}</div>
                    <div className="text-xs text-gray-400">dag {stad.volgorde === 1 ? '1–5' : stad.volgorde === 2 ? '6–9' : '10–14'}</div>
                  </div>
                  {i < steden.length - 1 && (
                    <div className="text-gray-300 text-lg">→</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Budget schatting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-600">Geschat totaal</span>
              <span className="text-2xl font-semibold text-gray-900">€{totaalGeschat.toLocaleString('nl-NL')}</span>
            </div>
            <div className="border-t pt-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Per persoon</div>
              <div className="space-y-1.5">
                {reis.reizigersnamen.map(naam => (
                  <div key={naam} className="flex justify-between text-sm">
                    <span className="text-gray-700">{naam}</span>
                    <span className="font-medium">€{Math.round(totaalGeschat / reis.reizigers).toLocaleString('nl-NL')}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tijdens de reis
  const huidigeDag = dagplannen.find(d => d.dagNummer === dagNummer) || dagplannen[0]
  const huidigeSt = steden.find(s => s.stad === huidigeDag.stad)
  const morgendagNummer = (dagNummer || 1) + 1
  const morgen = dagplannen.find(d => d.dagNummer === morgendagNummer)

  const totaalGeschat = uitgaven.reduce((s, u) => s + u.bedrag, 0)

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      {/* Hero vandaag */}
      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Dag {huidigeDag.dagNummer} van 14</p>
            <h1 className="text-3xl font-bold text-gray-900">{huidigeDag.stad}</h1>
            <p className="text-gray-500">{formatDatumKort(huidigeDag.datum)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Vandaag */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Vandaag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hotel */}
          {huidigeSt && (
            <div className="flex items-start gap-2.5 text-sm">
              <Hotel className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
              <span className="text-gray-700">{huidigeSt.hotel.naam}</span>
            </div>
          )}

          {/* Activiteiten */}
          {huidigeDag.activiteiten.length > 0 && (
            <div className="space-y-2">
              {huidigeDag.activiteiten.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-900">{act.naam}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusKleur(act.status)}`}>{act.status}</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">{act.startTijd} – {act.eindTijd}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transport */}
          {huidigeDag.transport.length > 0 && (
            <div className="space-y-2 pt-1 border-t">
              {huidigeDag.transport.map((tr, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Train className="w-4 h-4 text-gray-300 shrink-0" />
                  <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{getTransportLabel(tr.type)}</span>
                  <span className="text-gray-700">{tr.van} → {tr.naar}</span>
                  <span className="text-gray-400 text-xs ml-auto">{tr.vertrekTijd}</span>
                </div>
              ))}
            </div>
          )}

          {huidigeDag.notities && (
            <p className="text-sm text-gray-400 italic">{huidigeDag.notities}</p>
          )}
        </CardContent>
      </Card>

      {/* Budget */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Budget</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Geschat totaal</span>
            <span className="font-medium">€{totaalGeschat.toLocaleString('nl-NL')}</span>
          </div>
          <div className="border-t pt-2 space-y-1.5">
            {reis.reizigersnamen.map(naam => (
              <div key={naam} className="flex justify-between text-sm">
                <span className="text-gray-600">{naam}</span>
                <span>€{Math.round(totaalGeschat / reis.reizigers).toLocaleString('nl-NL')}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Morgen */}
      {morgen && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Morgen — dag {morgen.dagNummer}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {morgen.stad} · {formatDatumKort(morgen.datum)}
              {morgen.reisdag && <span className="ml-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">reisdag</span>}
            </div>
            <div className="space-y-1">
              {morgen.activiteiten.slice(0, 3).map((act, i) => (
                <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-gray-300">·</span>
                  <span>{act.naam}</span>
                  <span className="text-xs text-gray-400">{act.startTijd}</span>
                </div>
              ))}
              {morgen.activiteiten.length > 3 && (
                <div className="text-xs text-gray-400 pl-4">+{morgen.activiteiten.length - 3} meer</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
