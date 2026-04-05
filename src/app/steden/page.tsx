import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { uitgaven } from '@/data/budget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Hotel, Calendar, Star, ExternalLink } from 'lucide-react'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

function aantalNachten(start: string, eind: string) {
  const ms = new Date(eind).getTime() - new Date(start).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

function kostenVoorStad(stadNaam: string) {
  const stad = steden.find(s => s.stad === stadNaam)
  const hotelKosten = stad?.hotel.prijsTotaal || 0

  const activiteitenKosten = dagplannen
    .filter(d => d.stad === stadNaam)
    .flatMap(d => d.activiteiten)
    .reduce((s, a) => s + a.kosten, 0)

  const transportKosten = dagplannen
    .filter(d => d.stad === stadNaam)
    .flatMap(d => d.transport)
    .reduce((s, t) => s + t.kosten, 0)

  const overigKosten = uitgaven
    .filter(u => u.omschrijving.toLowerCase().includes(stadNaam.toLowerCase()) && u.categorie === 'eten')
    .reduce((s, u) => s + u.bedrag, 0)

  return { hotelKosten, activiteitenKosten, transportKosten, overigKosten }
}

export default function StedenPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Steden</h1>

      {steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => {
        const nachten = aantalNachten(stad.startDatum, stad.eindDatum)
        const kosten = kostenVoorStad(stad.stad)
        const totaal = kosten.hotelKosten + kosten.activiteitenKosten + kosten.transportKosten + kosten.overigKosten

        return (
          <div key={stad.id} className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900">{stad.stad}</h2>
              <span className="text-sm text-gray-500">
                {formatDatum(stad.startDatum)} – {formatDatum(stad.eindDatum)} · {nachten} nachten
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Hotel */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Hotel className="w-4 h-4" />
                    Hotel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{stad.hotel.naam}</div>
                    <div className="text-gray-500 mt-0.5">{stad.hotel.adres}</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-in</span>
                      <span>{formatDatum(stad.hotel.checkIn)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-out</span>
                      <span>{formatDatum(stad.hotel.checkOut)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prijs totaal</span>
                      <span className="font-medium">€{stad.hotel.prijsTotaal.toLocaleString('nl-NL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bevestigingscode</span>
                      <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{stad.hotel.bevestigingsCode}</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <a
                      href={stad.hotel.boekingslink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Boeking bekijken
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">geboekt</span>
                  </div>
                </CardContent>
              </Card>

              {/* Kosten + Highlights */}
              <div className="space-y-4">
                {/* Kosten */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Kosten {stad.stad}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hotel</span>
                      <span>€{kosten.hotelKosten.toLocaleString('nl-NL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Activiteiten</span>
                      <span>€{kosten.activiteitenKosten.toLocaleString('nl-NL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transport</span>
                      <span>€{kosten.transportKosten.toLocaleString('nl-NL')}</span>
                    </div>
                    {kosten.overigKosten > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Eten</span>
                        <span>€{kosten.overigKosten.toLocaleString('nl-NL')}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Totaal</span>
                      <span>€{totaal.toLocaleString('nl-NL')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Highlights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Must-do in {stad.stad}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {stad.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-300 mt-0.5">·</span>
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
