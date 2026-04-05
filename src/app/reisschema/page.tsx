'use client'

import { useState } from 'react'
import { dagplannen } from '@/data/dagplannen'
import { steden } from '@/data/steden'
import { ChevronDown, ChevronRight, Clock, Train } from 'lucide-react'

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

function formatDatumKort(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
}

const stadGroepen = steden
  .sort((a, b) => a.volgorde - b.volgorde)
  .map(s => ({
    stad: s,
    dagen: dagplannen.filter(d => d.stad === s.stad).sort((a, b) => a.dagNummer - b.dagNummer),
  }))

export default function ReisschemaPage() {
  const [opengeklapt, setOpengeklapt] = useState<Record<string, boolean>>({
    Osaka: false, Kyoto: false, Tokyo: false,
  })

  function toggle(stad: string) {
    setOpengeklapt(prev => ({ ...prev, [stad]: !prev[stad] }))
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-3">
      <h1 className="text-xl font-bold mb-6" style={{ color: JP_TEXT }}>Reisschema</h1>

      {stadGroepen.map(({ stad, dagen }) => {
        const isOpen = opengeklapt[stad.stad]

        return (
          <div
            key={stad.id}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
          >
            {/* Sectie-header */}
            <button
              onClick={() => toggle(stad.stad)}
              className="w-full flex items-center justify-between px-5 min-h-[60px] transition-colors duration-150 cursor-pointer text-left hover:bg-[#E0E0E0]"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-base" style={{ color: JP_TEXT }}>{stad.stad}</span>
                <span className="text-sm" style={{ color: JP_MUTED }}>
                  {new Date(stad.startDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                  {' – '}
                  {new Date(stad.eindDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                </span>
                <span className="text-xs hidden sm:inline" style={{ color: JP_MUTED }}>{dagen.length} dagen</span>
              </div>
              {isOpen
                ? <ChevronDown className="w-5 h-5 shrink-0" style={{ color: JP_MUTED }} />
                : <ChevronRight className="w-5 h-5 shrink-0" style={{ color: JP_MUTED }} />
              }
            </button>

            {isOpen && (
              <div style={{ borderTop: `1px solid ${JP_BORDER}` }}>
                {dagen.map((dag, index) => (
                  <div
                    key={dag.id}
                    className="px-5 py-4"
                    style={{ borderBottom: index < dagen.length - 1 ? `1px solid ${JP_BORDER}` : 'none' }}
                  >
                    {/* Dag header */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-bold w-12 shrink-0" style={{ color: JP_MUTED }}>
                        Dag {dag.dagNummer}
                      </span>
                      <span className="text-sm" style={{ color: JP_MUTED }}>
                        {formatDatumKort(dag.datum)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusKleur(dag.status)}`}>
                        {dag.status}
                      </span>
                      {dag.reisdag && (
                        <span className="text-xs reisdag-label px-2 py-0.5 rounded-full font-medium">
                          reisdag
                        </span>
                      )}
                    </div>

                    {/* Activiteiten */}
                    {dag.activiteiten.length > 0 && (
                      <div className="ml-14 space-y-2 mb-3">
                        {dag.activiteiten.map((act, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm">
                            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: JP_BORDER }} />
                            <span className="text-xs w-10 shrink-0 tabular-nums" style={{ color: JP_MUTED }}>
                              {act.startTijd}
                            </span>
                            <span className="flex-1 min-w-0 truncate" style={{ color: JP_TEXT }}>
                              {act.naam}
                            </span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${statusKleur(act.status)}`}>
                              {act.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Transport */}
                    {dag.transport.length > 0 && (
                      <div className="ml-14 space-y-1.5">
                        {dag.transport.map((tr, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs" style={{ color: JP_MUTED }}>
                            <Train className="w-3.5 h-3.5 shrink-0" style={{ color: JP_BORDER }} />
                            <span
                              className="px-1.5 py-0.5 rounded-md font-medium"
                              style={{ backgroundColor: JP_BORDER, color: JP_MUTED }}
                            >
                              {transportLabel(tr.type)}
                            </span>
                            <span className="truncate">{tr.van} → {tr.naar}</span>
                            <span className="shrink-0 tabular-nums">{tr.vertrekTijd}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dag.notities && (
                      <p className="ml-14 mt-2 text-xs italic" style={{ color: JP_MUTED }}>
                        {dag.notities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
