import { reis } from '@/data/reis'
import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { uitgaven } from '@/data/budget'
import { MapPin, BedDouble, Clock, Train, PlaneTakeoff } from 'lucide-react'

const JP_RED = '#C8102E'
const JP_TEXT = '#1A1A1A'
const JP_MUTED = '#6B6B6B'
const JP_CARD = '#F0F0F0'
const JP_BORDER = '#E0E0E0'

function statusKleur(status: string) {
  switch (status) {
    case 'gepland': return 'status-gepland'
    case 'idee': return 'status-idee'
    case 'geboekt': return 'status-geboekt'
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
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: JP_CARD }}
          >
            <PlaneTakeoff className="w-6 h-6" style={{ color: JP_MUTED }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: JP_TEXT }}>Reis afgerond</h1>
          <p style={{ color: JP_MUTED }}>September 2026 · Osaka · Kyoto · Tokyo</p>
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

        {/* Hero — afteller in Japans rood */}
        <div
          className="rounded-2xl px-6 py-12 text-center"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: JP_MUTED }}
          >
            Nog
          </p>
          <p
            className="text-[96px] leading-none font-extrabold tabular-nums"
            style={{ color: JP_RED }}
          >
            {dagTot}
          </p>
          <p className="text-xl font-semibold mt-4" style={{ color: JP_TEXT }}>
            dagen tot Japan
          </p>
          <p className="text-sm mt-2" style={{ color: JP_MUTED }}>
            {formatDatum(reis.startDatum)}
          </p>
        </div>

        {/* Route */}
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: JP_MUTED }}>
            Route
          </p>
          <div className="flex items-center justify-between">
            {steden.sort((a, b) => a.volgorde - b.volgorde).map((stad, i) => (
              <div key={stad.id} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="font-bold text-base" style={{ color: JP_TEXT }}>{stad.stad}</div>
                  <div className="text-xs mt-0.5" style={{ color: JP_MUTED }}>
                    {stad.volgorde === 1 ? 'dag 1–5' : stad.volgorde === 2 ? 'dag 6–9' : 'dag 10–14'}
                  </div>
                </div>
                {i < steden.length - 1 && (
                  <span className="text-base select-none" style={{ color: JP_BORDER }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: JP_MUTED }}>
            Budget schatting
          </p>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm" style={{ color: JP_MUTED }}>Geschat totaal</span>
            <span className="text-2xl font-bold" style={{ color: JP_TEXT }}>
              €{totaalGeschat.toLocaleString('nl-NL')}
            </span>
          </div>
          <div className="pt-3 space-y-2.5" style={{ borderTop: `1px solid ${JP_BORDER}` }}>
            {reis.reizigersnamen.map(naam => (
              <div key={naam} className="flex justify-between items-center">
                <span className="text-sm" style={{ color: JP_MUTED }}>{naam}</span>
                <span className="text-sm font-bold" style={{ color: JP_TEXT }}>
                  €{perPersoon.toLocaleString('nl-NL')}
                </span>
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

      {/* Hero vandaag — Japans rood */}
      <div
        className="rounded-2xl px-6 py-8 text-white"
        style={{ backgroundColor: JP_RED }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
          Dag {huidigeDag.dagNummer} van 14
        </p>
        <h1 className="text-4xl font-extrabold text-white mb-1">{huidigeDag.stad}</h1>
        <p className="text-sm opacity-70">{formatDatumKort(huidigeDag.datum)}</p>
      </div>

      {/* Vandaag */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
      >
        <div
          className="px-5 py-3.5"
          style={{ borderBottom: `1px solid ${JP_BORDER}` }}
        >
          <h2 className="font-bold text-base" style={{ color: JP_TEXT }}>Vandaag</h2>
        </div>

        <div className="px-5 py-4 space-y-4">
          {huidigeSt && (
            <div className="flex items-center gap-3 text-sm">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: JP_BORDER }}
              >
                <BedDouble className="w-4 h-4" style={{ color: JP_MUTED }} />
              </div>
              <span className="font-medium" style={{ color: JP_TEXT }}>{huidigeSt.hotel.naam}</span>
            </div>
          )}

          {huidigeDag.activiteiten.length > 0 && (
            <div className="space-y-3">
              {huidigeDag.activiteiten.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: JP_BORDER }}
                  >
                    <Clock className="w-4 h-4" style={{ color: JP_MUTED }} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium" style={{ color: JP_TEXT }}>{act.naam}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusKleur(act.status)}`}>
                        {act.status}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: JP_MUTED }}>
                      {act.startTijd} – {act.eindTijd}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {huidigeDag.transport.length > 0 && (
            <div className="pt-3 space-y-3" style={{ borderTop: `1px solid ${JP_BORDER}` }}>
              {huidigeDag.transport.map((tr, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: JP_BORDER }}
                  >
                    <Train className="w-4 h-4" style={{ color: JP_MUTED }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: JP_BORDER, color: JP_MUTED }}
                      >
                        {transportLabel(tr.type)}
                      </span>
                      <span className="text-sm truncate" style={{ color: JP_TEXT }}>
                        {tr.van} → {tr.naar}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs shrink-0 tabular-nums" style={{ color: JP_MUTED }}>
                    {tr.vertrekTijd}
                  </span>
                </div>
              ))}
            </div>
          )}

          {huidigeDag.notities && (
            <p className="text-sm italic pt-1" style={{ color: JP_MUTED }}>{huidigeDag.notities}</p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: JP_MUTED }}>Budget</p>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-sm" style={{ color: JP_MUTED }}>Geschat totaal</span>
          <span className="text-xl font-bold" style={{ color: JP_TEXT }}>
            €{totaalGeschat.toLocaleString('nl-NL')}
          </span>
        </div>
        <div className="pt-3 space-y-2" style={{ borderTop: `1px solid ${JP_BORDER}` }}>
          {reis.reizigersnamen.map(naam => (
            <div key={naam} className="flex justify-between text-sm">
              <span style={{ color: JP_MUTED }}>{naam}</span>
              <span className="font-bold" style={{ color: JP_TEXT }}>
                €{Math.round(totaalGeschat / reis.reizigers).toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Morgen */}
      {morgen && (
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>Morgen</p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: JP_MUTED }}>Dag {morgen.dagNummer}</span>
              {morgen.reisdag && (
                <span className="text-xs reisdag-label px-2 py-0.5 rounded-full font-medium">reisdag</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: JP_MUTED }} />
            <span className="text-sm font-bold" style={{ color: JP_TEXT }}>{morgen.stad}</span>
            <span className="text-sm" style={{ color: JP_MUTED }}>
              · {new Date(morgen.datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
            </span>
          </div>
          <div className="space-y-1.5">
            {morgen.activiteiten.slice(0, 3).map((act, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: JP_MUTED }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: JP_BORDER }} />
                <span className="flex-1 min-w-0 truncate">{act.naam}</span>
                <span className="text-xs shrink-0 tabular-nums">{act.startTijd}</span>
              </div>
            ))}
            {morgen.activiteiten.length > 3 && (
              <p className="text-xs pl-3.5" style={{ color: JP_MUTED }}>
                +{morgen.activiteiten.length - 3} meer
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
