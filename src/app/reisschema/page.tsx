'use client'

import { useState } from 'react'
import { dagplannen } from '@/data/dagplannen'
import { steden } from '@/data/steden'
import { ChevronDown, ChevronRight, Clock, Train } from 'lucide-react'

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
    Osaka: false,
    Kyoto: false,
    Tokyo: false,
  })

  function toggle(stad: string) {
    setOpengeklapt(prev => ({ ...prev, [stad]: !prev[stad] }))
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-3">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Reisschema</h1>

      {stadGroepen.map(({ stad, dagen }) => {
        const isOpen = opengeklapt[stad.stad]

        return (
          <div key={stad.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            {/* Sectie-header — groot touch target */}
            <button
              onClick={() => toggle(stad.stad)}
              className="w-full flex items-center justify-between px-5 min-h-[60px] hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 cursor-pointer text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900 text-base">{stad.stad}</span>
                <span className="text-sm text-slate-400">
                  {new Date(stad.startDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                  {' – '}
                  {new Date(stad.eindDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">{dagen.length} dagen</span>
              </div>
              {isOpen
                ? <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              }
            </button>

            {/* Dagen */}
            {isOpen && (
              <div className="border-t border-slate-100 divide-y divide-slate-50">
                {dagen.map(dag => (
                  <div key={dag.id} className="px-5 py-4">

                    {/* Dag header */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-bold text-slate-400 w-12 shrink-0">Dag {dag.dagNummer}</span>
                      <span className="text-sm text-slate-600">{formatDatumKort(dag.datum)}</span>
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
                            <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            <span className="text-slate-400 text-xs w-10 shrink-0 tabular-nums">{act.startTijd}</span>
                            <span className="text-slate-700 flex-1 min-w-0 truncate">{act.naam}</span>
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
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                            <Train className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium">
                              {transportLabel(tr.type)}
                            </span>
                            <span className="truncate">{tr.van} → {tr.naar}</span>
                            <span className="text-slate-400 shrink-0 tabular-nums">{tr.vertrekTijd}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dag.notities && (
                      <p className="ml-14 mt-2 text-xs text-slate-400 italic">{dag.notities}</p>
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
