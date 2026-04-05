import { uitgaven } from '@/data/budget'
import { reis } from '@/data/reis'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categorieLabels: Record<string, string> = {
  vlucht: 'Vluchten',
  hotel: 'Hotels',
  transport: 'Transport',
  eten: 'Eten & drinken',
  activiteit: 'Activiteiten',
  overig: 'Overig',
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
}

export default function BudgetPage() {
  const totaalGeschat = uitgaven.reduce((s, u) => s + u.bedrag, 0)
  const totaalUitgegeven = 0 // Wordt later bijgehouden via Google Sheets

  // Per categorie
  const perCategorie = Object.keys(categorieLabels).map(cat => {
    const bedrag = uitgaven.filter(u => u.categorie === cat).reduce((s, u) => s + u.bedrag, 0)
    return { categorie: cat, bedrag }
  }).filter(c => c.bedrag > 0).sort((a, b) => b.bedrag - a.bedrag)

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Budget</h1>

      {/* Twee grote getallen */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Geschat totaal</div>
            <div className="text-3xl font-bold text-gray-900">€{totaalGeschat.toLocaleString('nl-NL')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Uitgegeven</div>
            <div className="text-3xl font-bold text-gray-400">€{totaalUitgegeven.toLocaleString('nl-NL')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Per persoon */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Per persoon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {reis.reizigersnamen.map(naam => (
            <div key={naam} className="flex justify-between items-baseline">
              <span className="text-gray-700">{naam}</span>
              <span className="text-lg font-semibold text-gray-900">
                €{Math.round(totaalGeschat / reis.reizigers).toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-400 pt-1 italic">Geschat aandeel op basis van gelijke verdeling</p>
        </CardContent>
      </Card>

      {/* Per categorie */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Per categorie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {perCategorie.map(({ categorie, bedrag }) => (
            <div key={categorie} className="flex justify-between text-sm py-1 border-b last:border-0">
              <span className="text-gray-700">{categorieLabels[categorie]}</span>
              <span className="font-medium text-gray-900">€{bedrag.toLocaleString('nl-NL')}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alle uitgavenposten */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Alle posten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {uitgaven
              .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
              .map(uitgave => (
                <div key={uitgave.id} className="flex items-start gap-3 py-2.5 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800">{uitgave.omschrijving}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {formatDatum(uitgave.datum)} · {categorieLabels[uitgave.categorie]}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 shrink-0">
                    €{uitgave.bedrag.toLocaleString('nl-NL')}
                  </span>
                </div>
              ))}
          </div>
          <div className="flex justify-between font-semibold text-sm mt-4 pt-3 border-t">
            <span>Totaal</span>
            <span>€{totaalGeschat.toLocaleString('nl-NL')}</span>
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">
            Werkelijke uitgaven worden later bijgehouden via Google Sheets
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
