'use client'

import { useState } from 'react'
import { dagplannen } from '@/data/dagplannen'
import { steden } from '@/data/steden'
import { ChevronDown, ChevronRight, Clock, Train } from 'lucide-react'

function getStatusKleur(status: string) {
  switch (status) {
    case 'gepland': return 'bg-blue-100 text-blue-800'
    case 'idee': return 'bg-gray-100 text-gray-500'
    case 'afgerond': return 'bg-gray-100 text-gray-400'
    default: return 'bg-gray-100 text-gray-500'
  }
}

function getTransportLabel(type: string) {
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
    <div className="p-6 max-w-2xl mx-auto space-y-3">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Reisschema</h1>

      {stadGroepen.map(({ stad, dagen }) => {
        const isOpen = opengeklapt[stad.stad]

        return (
          <div key={stad.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {/* Sectie-header */}
            <button
              onClick={() => toggle(stad.stad)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{stad.stad}</span>
                <span className="text-sm text-gray-400">
                  {new Date(stad.startDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                  {' – '}
                  {new Date(stad.eindDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                </span>
                <span className="text-xs text-gray-400">{dagen.length} dagen</span>
              </div>
              {isOpen
                ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              }
            </button>

            {/* Dagen */}
            {isOpen && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {dagen.map(dag => (
                  <div key={dag.id} className="px-5 py-4">
                    {/* Dag header */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-semibold text-gray-400 w-10 shrink-0">Dag {dag.dagNummer}</span>
                      <span className="text-sm text-gray-600">{formatDatumKort(dag.datum)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusKleur(dag.status)}`}>
                        {dag.status}
                      </span>
                      {dag.reisdag && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">reisdag</span>
                      )}
                    </div>

                    {/* Activiteiten */}
                    {dag.activiteiten.length > 0 && (
                      <div className="ml-12 space-y-1.5 mb-3">
                        {dag.activiteiten.map((act, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Clock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            <span className="text-gray-400 text-xs w-10 shrink-0">{act.startTijd}</span>
                            <span className="text-gray-700 flex-1 min-w-0 truncate">{act.naam}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${getStatusKleur(act.status)}`}>
                              {act.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Transport */}
                    {dag.transport.length > 0 && (
                      <div className="ml-12 space-y-1">
                        {dag.transport.map((tr, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                            <Train className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{getTransportLabel(tr.type)}</span>
                            <span className="truncate">{tr.van} → {tr.naar}</span>
                            <span className="text-gray-400 shrink-0">{tr.vertrekTijd}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notitie */}
                    {dag.notities && (
                      <p className="ml-12 mt-2 text-xs text-gray-400 italic">{dag.notities}</p>
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
