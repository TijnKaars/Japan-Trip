import { uitgaven } from '@/data/budget'
import { reis } from '@/data/reis'
import { steden } from '@/data/steden'
import { dagplannen } from '@/data/dagplannen'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet } from 'lucide-react'

const categorieLabels: Record<string, string> = {
  vlucht: 'Vluchten',
  hotel: 'Hotels',
  transport: 'Transport',
  eten: 'Eten & drinken',
  activiteit: 'Activiteiten',
  overig: 'Overig',
}

const categorieKleuren: Record<string, string> = {
  vlucht: 'bg-blue-500',
  hotel: 'bg-green-500',
  transport: 'bg-yellow-500',
  eten: 'bg-orange-500',
  activiteit: 'bg-purple-500',
  overig: 'bg-gray-400',
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
}

export default function BudgetPage() {
  const totaalGeboekt = uitgaven.filter(u => u.geboekt).reduce((s, u) => s + u.bedrag, 0)
  const totaalGeschat = uitgaven.filter(u => !u.geboekt).reduce((s, u) => s + u.bedrag, 0)
  const totaal = totaalGeboekt + totaalGeschat

  // Per categorie
  const perCategorie = Object.keys(categorieLabels).map(cat => {
    const bedrag = uitgaven.filter(u => u.categorie === cat).reduce((s, u) => s + u.bedrag, 0)
    return { categorie: cat, bedrag }
  }).filter(c => c.bedrag > 0)

  const maxCategorie = Math.max(...perCategorie.map(c => c.bedrag))

  // Per stad
  const stadKosten = steden.sort((a, b) => a.volgorde - b.volgorde).map(stad => {
    const hotelKosten = stad.hotel.prijsTotaal

    const activiteitenKosten = dagplannen
      .filter(d => d.stad === stad.stad)
      .flatMap(d => d.activiteiten)
      .reduce((s, a) => s + a.kosten, 0)

    const transportKosten = dagplannen
      .filter(d => d.stad === stad.stad)
      .flatMap(d => d.transport)
      .reduce((s, t) => s + t.kosten, 0)

    const etenKosten = uitgaven
      .filter(u => u.categorie === 'eten' && u.omschrijving.toLowerCase().includes(stad.stad.toLowerCase()))
      .reduce((s, u) => s + u.bedrag, 0)

    return {
      stad: stad.stad,
      totaal: hotelKosten + activiteitenKosten + transportKosten + etenKosten,
    }
  })

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Budget</h1>

      {/* Samenvatting */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Geboekt</div>
            <div className="text-2xl font-semibold text-green-700">€{totaalGeboekt.toLocaleString('nl-NL')}</div>
            <div className="text-xs text-gray-400 mt-1">Vaste kosten</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Geschat</div>
            <div className="text-2xl font-semibold text-blue-600">€{totaalGeschat.toLocaleString('nl-NL')}</div>
            <div className="text-xs text-gray-400 mt-1">Schattingen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Per persoon</div>
            <div className="text-2xl font-semibold text-gray-900">€{Math.round(totaal / reis.reizigers).toLocaleString('nl-NL')}</div>
            <div className="text-xs text-gray-400 mt-1">Totaal ÷ {reis.reizigers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Per categorie */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Per categorie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {perCategorie.sort((a, b) => b.bedrag - a.bedrag).map(({ categorie, bedrag }) => (
            <div key={categorie} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{categorieLabels[categorie]}</span>
                <span className="font-medium">€{bedrag.toLocaleString('nl-NL')}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${categorieKleuren[categorie]}`}
                  style={{ width: `${(bedrag / maxCategorie) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Per stad */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Per stad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stadKosten.map(({ stad, totaal: stadTotaal }) => (
              <div key={stad} className="flex justify-between text-sm py-1.5 border-b last:border-0">
                <span className="text-gray-700">{stad}</span>
                <div className="text-right">
                  <span className="font-medium">€{stadTotaal.toLocaleString('nl-NL')}</span>
                  <span className="text-gray-400 ml-2 text-xs">
                    (€{Math.round(stadTotaal / reis.reizigers).toLocaleString('nl-NL')} p.p.)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alle uitgaven */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Alle uitgaven</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {uitgaven
              .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
              .map(uitgave => (
                <div key={uitgave.id} className="flex items-center gap-3 py-2.5 border-b last:border-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${categorieKleuren[uitgave.categorie]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800 truncate">{uitgave.omschrijving}</div>
                    <div className="text-xs text-gray-400">{formatDatum(uitgave.datum)} · {categorieLabels[uitgave.categorie]}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-medium">€{uitgave.bedrag.toLocaleString('nl-NL')}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${uitgave.geboekt ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {uitgave.geboekt ? 'geboekt' : 'schatting'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between font-semibold text-sm mt-4 pt-3 border-t">
            <span>Totaal</span>
            <span>€{totaal.toLocaleString('nl-NL')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
