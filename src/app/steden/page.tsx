import { steden } from '@/data/steden'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Hotel, Star, ExternalLink } from 'lucide-react'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

function aantalNachten(start: string, eind: string) {
  const ms = new Date(eind).getTime() - new Date(start).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

export default function StedenPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Steden & Hotels</h1>

      {steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => {
        const nachten = aantalNachten(stad.startDatum, stad.eindDatum)

        return (
          <div key={stad.id} className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">{stad.stad}</h2>
              <span className="text-sm text-gray-400">
                {formatDatum(stad.startDatum)} – {formatDatum(stad.eindDatum)} · {nachten} nachten
              </span>
            </div>

            {/* Hotel */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Hotel className="w-3.5 h-3.5" />
                  Hotel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-gray-900">{stad.hotel.naam}</div>
                  <div className="text-gray-500 mt-0.5 text-xs">{stad.hotel.adres}</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="text-gray-500">Check-in</div>
                  <div>{formatDatum(stad.hotel.checkIn)}</div>
                  <div className="text-gray-500">Check-out</div>
                  <div>{formatDatum(stad.hotel.checkOut)}</div>
                  <div className="text-gray-500">Nachten</div>
                  <div>{nachten}</div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">nog niet geboekt</span>
                  {stad.hotel.boekingslink ? (
                    <a
                      href={stad.hotel.boekingslink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Bekijk hotel
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">Boekingslink nog niet ingesteld</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" />
                  Must-do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {stad.highlights.slice(0, 6).map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-300 mt-0.5 shrink-0">·</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
