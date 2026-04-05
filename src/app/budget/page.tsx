import { uitgaven } from '@/data/budget'
import { reis } from '@/data/reis'

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
  const perPersoon = Math.round(totaalGeschat / reis.reizigers)

  const perCategorie = Object.keys(categorieLabels)
    .map(cat => ({
      categorie: cat,
      bedrag: uitgaven.filter(u => u.categorie === cat).reduce((s, u) => s + u.bedrag, 0),
    }))
    .filter(c => c.bedrag > 0)
    .sort((a, b) => b.bedrag - a.bedrag)

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Budget</h1>

      {/* Twee grote getallen */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Geschat</p>
          <p className="text-3xl font-bold text-slate-900">€{totaalGeschat.toLocaleString('nl-NL')}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Uitgegeven</p>
          <p className="text-3xl font-bold text-slate-300">€0</p>
        </div>
      </div>

      {/* Per persoon */}
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Per persoon</p>
        <div className="space-y-3">
          {reis.reizigersnamen.map(naam => (
            <div key={naam} className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">{naam}</span>
              <span className="text-xl font-bold text-slate-900">€{perPersoon.toLocaleString('nl-NL')}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 italic">Geschat op basis van gelijke verdeling</p>
      </div>

      {/* Per categorie */}
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Per categorie</p>
        <div className="space-y-2">
          {perCategorie.map(({ categorie, bedrag }) => (
            <div key={categorie} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-700">{categorieLabels[categorie]}</span>
              <span className="text-sm font-semibold text-slate-900">€{bedrag.toLocaleString('nl-NL')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alle posten */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Alle posten</p>
        </div>
        <div className="divide-y divide-slate-50">
          {uitgaven
            .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
            .map(uitgave => (
              <div key={uitgave.id} className="flex items-start gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 leading-snug">{uitgave.omschrijving}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {formatDatum(uitgave.datum)} · {categorieLabels[uitgave.categorie]}
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900 shrink-0 tabular-nums">
                  €{uitgave.bedrag.toLocaleString('nl-NL')}
                </span>
              </div>
            ))}
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-700">Totaal</span>
          <span className="text-base font-bold text-slate-900">€{totaalGeschat.toLocaleString('nl-NL')}</span>
        </div>
        <div className="px-5 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 italic">
            Werkelijke uitgaven worden later bijgehouden via Google Sheets
          </p>
        </div>
      </div>
    </div>
  )
}
