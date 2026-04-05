import { steden } from '@/data/steden'
import { MapPin, BedDouble, Star, ExternalLink } from 'lucide-react'

const JP_RED = '#C8102E'
const JP_TEXT = '#1A1A1A'
const JP_MUTED = '#6B6B6B'
const JP_CARD = '#F0F0F0'
const JP_BORDER = '#E0E0E0'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

function aantalNachten(start: string, eind: string) {
  return Math.round((new Date(eind).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24))
}

export default function StedenPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-8">
      <h1 className="text-xl font-bold" style={{ color: JP_TEXT }}>Steden & Hotels</h1>

      {steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => {
        const nachten = aantalNachten(stad.startDatum, stad.eindDatum)

        return (
          <div key={stad.id} className="space-y-3">

            {/* Stad header */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: JP_RED }} />
              <h2 className="text-lg font-bold" style={{ color: JP_TEXT }}>{stad.stad}</h2>
              <span className="text-sm" style={{ color: JP_MUTED }}>
                {formatDatum(stad.startDatum)} – {formatDatum(stad.eindDatum)}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full ml-auto shrink-0 font-medium"
                style={{ backgroundColor: JP_BORDER, color: JP_MUTED }}
              >
                {nachten} nachten
              </span>
            </div>

            {/* Hotel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${JP_BORDER}` }}
              >
                <BedDouble className="w-3.5 h-3.5" style={{ color: JP_MUTED }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>
                  Hotel
                </span>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div>
                  <div className="font-bold" style={{ color: JP_TEXT }}>{stad.hotel.naam}</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: JP_MUTED }}>
                    {stad.hotel.adres}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div style={{ color: JP_MUTED }}>Check-in</div>
                  <div className="font-medium" style={{ color: JP_TEXT }}>{formatDatum(stad.hotel.checkIn)}</div>
                  <div style={{ color: JP_MUTED }}>Check-out</div>
                  <div className="font-medium" style={{ color: JP_TEXT }}>{formatDatum(stad.hotel.checkOut)}</div>
                  <div style={{ color: JP_MUTED }}>Nachten</div>
                  <div className="font-medium" style={{ color: JP_TEXT }}>{nachten}</div>
                </div>
                <div
                  className="flex items-center justify-between pt-2"
                  style={{ borderTop: `1px solid ${JP_BORDER}` }}
                >
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: JP_BORDER, color: JP_MUTED }}
                  >
                    nog niet geboekt
                  </span>
                  {stad.hotel.boekingslink ? (
                    <a
                      href={stad.hotel.boekingslink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer"
                      style={{ color: JP_RED }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Bekijk hotel
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: JP_MUTED }}>Link volgt</span>
                  )}
                </div>
              </div>
            </div>

            {/* Must-do */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${JP_BORDER}` }}
              >
                <Star className="w-3.5 h-3.5" style={{ color: JP_MUTED }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>
                  Must-do
                </span>
              </div>
              <div className="px-5 py-4">
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {stad.highlights.slice(0, 6).map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: JP_TEXT }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: JP_RED }}
                      />
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
