import { steden } from '@/data/steden'
import { MapPin, BedDouble, Star, ExternalLink } from 'lucide-react'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

function aantalNachten(start: string, eind: string) {
  return Math.round((new Date(eind).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24))
}

export default function StedenPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Steden & Hotels</h1>

      {steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => {
        const nachten = aantalNachten(stad.startDatum, stad.eindDatum)

        return (
          <div key={stad.id} className="space-y-3">

            {/* Stad header */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <h2 className="text-lg font-semibold text-slate-900">{stad.stad}</h2>
              <span className="text-sm text-slate-400">
                {formatDatum(stad.startDatum)} – {formatDatum(stad.eindDatum)}
              </span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-auto shrink-0">
                {nachten} nachten
              </span>
            </div>

            {/* Hotel */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Hotel</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div>
                  <div className="font-semibold text-slate-900">{stad.hotel.naam}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{stad.hotel.adres}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="text-slate-500">Check-in</div>
                  <div className="text-slate-900 font-medium">{formatDatum(stad.hotel.checkIn)}</div>
                  <div className="text-slate-500">Check-out</div>
                  <div className="text-slate-900 font-medium">{formatDatum(stad.hotel.checkOut)}</div>
                  <div className="text-slate-500">Nachten</div>
                  <div className="text-slate-900 font-medium">{nachten}</div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs status-idee px-2.5 py-1 rounded-full font-medium">
                    nog niet geboekt
                  </span>
                  {stad.hotel.boekingslink ? (
                    <a
                      href={stad.hotel.boekingslink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors duration-150 cursor-pointer font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Bekijk hotel
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Link volgt</span>
                  )}
                </div>
              </div>
            </div>

            {/* Must-do */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Must-do</span>
              </div>
              <div className="px-5 py-4">
                <ul className="grid sm:grid-cols-2 gap-2">
                  {stad.highlights.slice(0, 6).map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
