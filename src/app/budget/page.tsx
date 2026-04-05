import { uitgaven } from '@/data/budget'
import { reis } from '@/data/reis'

const JP_TEXT = '#1A1A1A'
const JP_MUTED = '#6B6B6B'
const JP_CARD = '#F0F0F0'
const JP_BORDER = '#E0E0E0'

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
      <h1 className="text-xl font-bold" style={{ color: JP_TEXT }}>Budget</h1>

      {/* Twee grote getallen */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: JP_MUTED }}>
            Geschat
          </p>
          <p className="text-3xl font-extrabold tabular-nums" style={{ color: JP_TEXT }}>
            €{totaalGeschat.toLocaleString('nl-NL')}
          </p>
        </div>
        <div
          className="rounded-2xl px-5 py-5"
          style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: JP_MUTED }}>
            Uitgegeven
          </p>
          <p className="text-3xl font-extrabold tabular-nums" style={{ color: JP_BORDER }}>
            €0
          </p>
        </div>
      </div>

      {/* Per persoon */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: JP_MUTED }}>
          Per persoon
        </p>
        <div className="space-y-3">
          {reis.reizigersnamen.map(naam => (
            <div key={naam} className="flex items-center justify-between">
              <span className="font-medium" style={{ color: JP_MUTED }}>{naam}</span>
              <span className="text-xl font-extrabold tabular-nums" style={{ color: JP_TEXT }}>
                €{perPersoon.toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 italic" style={{ color: JP_MUTED }}>
          Geschat op basis van gelijke verdeling
        </p>
      </div>

      {/* Per categorie */}
      <div
        className="rounded-2xl px-5 py-5"
        style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: JP_MUTED }}>
          Per categorie
        </p>
        <div className="space-y-0">
          {perCategorie.map(({ categorie, bedrag }) => (
            <div
              key={categorie}
              className="flex justify-between items-center py-2.5"
              style={{ borderBottom: `1px solid ${JP_BORDER}` }}
            >
              <span className="text-sm" style={{ color: JP_MUTED }}>{categorieLabels[categorie]}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: JP_TEXT }}>
                €{bedrag.toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alle posten */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: JP_CARD, border: `1px solid ${JP_BORDER}` }}
      >
        <div className="px-5 py-3" style={{ borderBottom: `1px solid ${JP_BORDER}` }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: JP_MUTED }}>
            Alle posten
          </p>
        </div>
        <div>
          {uitgaven
            .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime())
            .map((uitgave, index, arr) => (
              <div
                key={uitgave.id}
                className="flex items-start gap-3 px-5 py-3"
                style={{ borderBottom: index < arr.length - 1 ? `1px solid ${JP_BORDER}` : 'none' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug" style={{ color: JP_TEXT }}>
                    {uitgave.omschrijving}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: JP_MUTED }}>
                    {formatDatum(uitgave.datum)} · {categorieLabels[uitgave.categorie]}
                  </div>
                </div>
                <span className="text-sm font-bold shrink-0 tabular-nums" style={{ color: JP_TEXT }}>
                  €{uitgave.bedrag.toLocaleString('nl-NL')}
                </span>
              </div>
            ))}
        </div>
        <div
          className="px-5 py-3 flex justify-between items-center"
          style={{ backgroundColor: JP_BORDER, borderTop: `1px solid ${JP_BORDER}` }}
        >
          <span className="text-sm font-bold" style={{ color: JP_TEXT }}>Totaal</span>
          <span className="text-base font-extrabold tabular-nums" style={{ color: JP_TEXT }}>
            €{totaalGeschat.toLocaleString('nl-NL')}
          </span>
        </div>
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${JP_BORDER}` }}>
          <p className="text-xs italic" style={{ color: JP_MUTED }}>
            Werkelijke uitgaven worden later bijgehouden via Google Sheets
          </p>
        </div>
      </div>
    </div>
  )
}
