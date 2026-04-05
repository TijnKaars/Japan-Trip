import { reis } from '@/data/reis'
import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { uitgaven } from '@/data/budget'
import { MapPin, BedDouble, Clock, Train, PlaneTakeoff } from 'lucide-react'

function statusKleur(status: string) {
  switch (status) {
    case 'gepland': return 'status-gepland'
    case 'idee': return 'status-idee'
    case 'afgerond': return 'status-afgerond'
    default: return 'status-idee'
  }
}

function transportLabel(type: string) {
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
  return new Date(datum).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })
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
      <div className="flex items-center justify-center min-h-[70vh] p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PlaneTakeoff className="w-6 h-6 text-slate-400" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Reis afgerond</h1>
          <p className="text-slate-500">September 2026 · Osaka · Kyoto · Tokyo</p>
        </div>
      </div>
    )
  }

  // Voor de reis
  if (fase === 'voor') {
    const totaalGeschat = uitgaven.reduce((s, u) => s + u.bedrag, 0)
    const perPersoon = Math.round(totaalGeschat / reis.reizigers)

    return (
      <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-4">

        {/* Hero — afteller */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-10 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Nog</p>
          <p className="text-[88px] leading-none font-bold text-slate-900 tabular-nums">{dagTot}</p>
          <p className="text-xl text-slate-500 mt-3">dagen tot Japan</p>
          <p className="text-sm text-slate-400 mt-2">{formatDatum(reis.startDatum)}</p>
        </div>

        {/* Route */}
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Route</p>
          <div className="flex items-center justify-between">
            {steden.sort((a, b) => a.volgorde - b.volgorde).map((stad, i) => (
              <div key={stad.id} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="font-semibold text-slate-900 text-base">{stad.stad}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {stad.volgorde === 1 ? 'dag 1–5' : stad.volgorde === 2 ? 'dag 6–9' : 'dag 10–14'}
                  </div>
                </div>
                {i < steden.length - 1 && (
                  <span className="text-slate-300 text-base select-none">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Budget schatting</p>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-slate-600 text-sm">Geschat totaal</span>
            <span className="text-2xl font-bold text-slate-900">€{totaalGeschat.toLocaleString('nl-NL')}</span>
          </div>
          <div className="border-t border-slate-100 pt-3 space-y-2">
            {reis.reizigersnamen.map(naam => (
              <div key={naam} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{naam}</span>
                <span className="text-sm font-semibold text-slate-900">€{perPersoon.toLocaleString('nl-NL')}</span>
              </div>
            ))}
          </div>
        </div>

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
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-4">

      {/* Hero — vandaag */}
      <div className="bg-slate-900 rounded-2xl px-6 py-8 text-white">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Dag {huidigeDag.dagNummer} van 14
        </p>
        <h1 className="text-4xl font-bold text-white mb-1">{huidigeDag.stad}</h1>
        <p className="text-slate-400 text-sm">{formatDatumKort(huidigeDag.datum)}</p>
      </div>

      {/* Vandaag — het zwaarste blok */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Vandaag</h2>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Hotel */}
          {huidigeSt && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                <BedDouble className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-slate-700 font-medium">{huidigeSt.hotel.naam}</span>
            </div>
          )}

          {/* Activiteiten */}
          {huidigeDag.activiteiten.length > 0 && (
            <div className="space-y-2.5">
              {huidigeDag.activiteiten.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-900">{act.naam}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusKleur(act.status)}`}>
                        {act.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{act.startTijd} – {act.eindTijd}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transport */}
          {huidigeDag.transport.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              {huidigeDag.transport.map((tr, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Train className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {transportLabel(tr.type)}
                      </span>
                      <span className="text-sm text-slate-700 truncate">{tr.van} → {tr.naar}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{tr.vertrekTijd}</span>
                </div>
              ))}
            </div>
          )}

          {huidigeDag.notities && (
            <p className="text-sm text-slate-400 italic pt-1">{huidigeDag.notities}</p>
          )}
        </div>
      </div>

      {/* Budget — compact */}
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Budget</p>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-sm text-slate-600">Geschat totaal</span>
          <span className="text-xl font-bold text-slate-900">€{totaalGeschat.toLocaleString('nl-NL')}</span>
        </div>
        <div className="border-t border-slate-100 pt-3 space-y-2">
          {reis.reizigersnamen.map(naam => (
            <div key={naam} className="flex justify-between text-sm">
              <span className="text-slate-600">{naam}</span>
              <span className="font-medium text-slate-900">
                €{Math.round(totaalGeschat / reis.reizigers).toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Morgen — compact preview */}
      {morgen && (
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Morgen</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Dag {morgen.dagNummer}</span>
              {morgen.reisdag && (
                <span className="text-xs reisdag-label px-2 py-0.5 rounded-full font-medium">reisdag</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">{morgen.stad}</span>
            <span className="text-sm text-slate-400">· {new Date(morgen.datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="space-y-1.5">
            {morgen.activiteiten.slice(0, 3).map((act, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                <span className="flex-1 min-w-0 truncate">{act.naam}</span>
                <span className="text-xs text-slate-400 shrink-0">{act.startTijd}</span>
              </div>
            ))}
            {morgen.activiteiten.length > 3 && (
              <p className="text-xs text-slate-400 pl-3.5">+{morgen.activiteiten.length - 3} meer</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
