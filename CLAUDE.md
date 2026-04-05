# CLAUDE.md — Japan Reis Dashboard

Dit document beschrijft het volledige project. Lees dit altijd volledig voordat je iets bouwt.

---

## Project Doel

Een overzichtelijke reiswebsite voor een 14-daagse Japan trip in september 2026.
Drie vrienden gebruiken deze website om de reis te volgen en alle informatie op één plek te hebben.
De website is openbaar — geen login nodig.
Data wordt beheerd via TypeScript bestanden door de eigenaar.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Taal:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Data:** Statische TypeScript bestanden in `/src/data/`
- **Hosting:** Vercel

Geen database. Geen API routes. Geen authenticatie.

---

## Taal

De gehele website is in het **Nederlands**.
- Alle UI tekst, labels, knoppen, titels → Nederlands
- Variabelen, functies, bestandsnamen → Engels

---

## Projectstructuur

```
src/
├── app/
│   ├── page.tsx                  # Redirect naar /dashboard
│   ├── layout.tsx                # Root layout met navigatie
│   ├── dashboard/
│   │   └── page.tsx
│   ├── reisschema/
│   │   └── page.tsx
│   ├── steden/
│   │   └── page.tsx
│   ├── logistiek/
│   │   └── page.tsx
│   ├── budget/
│   │   └── page.tsx
│   └── documenten/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   └── ui/                       # shadcn/ui componenten
├── data/
│   ├── reis.ts                   # Reisinfo en instellingen
│   ├── steden.ts                 # Steden, hotels, highlights
│   ├── dagplannen.ts             # Dag-voor-dag planning
│   ├── budget.ts                 # Alle uitgaven en schattingen
│   └── documenten.ts             # Links, taken, notities
└── lib/
    └── utils.ts
```

---

## Data Structuur

Alle data staat in `/src/data/`. Nooit een database gebruiken.

### reis.ts
```typescript
export const reis = {
  naam: string,
  startDatum: string,        // "2026-09-01"
  eindDatum: string,         // "2026-09-14"
  reizigers: number,         // 3
  valuta: string,            // "EUR"
}
```

### steden.ts
```typescript
export const steden: StadVerblijf[] = [
  {
    id: string,
    stad: string,            // "Osaka"
    startDatum: string,
    eindDatum: string,
    volgorde: number,
    hotel: {
      naam: string,
      adres: string,
      checkIn: string,
      checkOut: string,
      prijsTotaal: number,
      boekingslink: string,
      bevestigingsCode: string,
    },
    highlights: string[],
  }
]
```

### dagplannen.ts
```typescript
export const dagplannen: DagPlan[] = [
  {
    id: string,
    datum: string,           // "2026-09-01"
    dagNummer: number,       // 1
    stad: string,
    status: 'idee' | 'gepland' | 'geboekt' | 'afgerond',
    activiteiten: [
      {
        naam: string,
        startTijd: string,
        eindTijd: string,
        locatie: string,
        kosten: number,
        status: 'idee' | 'gepland' | 'geboekt',
        notities: string,
      }
    ],
    transport: [
      {
        type: 'vlucht' | 'trein' | 'metro' | 'taxi' | 'bus' | 'lopen',
        van: string,
        naar: string,
        vertrekTijd: string,
        aankomstTijd: string,
        kosten: number,
        notities: string,
      }
    ],
    notities: string,
  }
]
```

### budget.ts
```typescript
export const uitgaven: Uitgave[] = [
  {
    id: string,
    datum: string,
    categorie: 'vlucht' | 'hotel' | 'transport' | 'eten' | 'activiteit' | 'overig',
    omschrijving: string,
    bedrag: number,          // totaal bedrag (alle reizigers)
    geboekt: boolean,        // true = vaste kost, false = schatting
  }
]
```

### documenten.ts
```typescript
export const links: LinkItem[] = [
  {
    id: string,
    label: string,
    url: string,
    type: 'boeking' | 'kaart' | 'info' | 'overig',
  }
]

export const taken: Taak[] = [
  {
    id: string,
    titel: string,
    status: 'open' | 'afgerond',
    vervaldatum: string,
  }
]
```

---

## Pagina's

### 1. Dashboard (`/dashboard`)
Het belangrijkste scherm. Gebruiker begrijpt de reis binnen 10 seconden.

Blokken:
- **Reisinfo:** naam, route (Osaka → Kyoto → Tokyo), countdown tot vertrek
- **Vandaag:** huidige dag, stad, hotel van de nacht, activiteiten van vandaag, vervoer van vandaag
- **Komende 3 dagen:** compacte weergave per dag
- **Budget samenvatting:** totaal geboekt, totaal geschat, per persoon
- **Openstaande taken:** eerste 5 open taken

Logica voor "vandaag":
- Voor de reis: toon dag 1
- Tijdens de reis: toon de huidige dag op basis van datum
- Na de reis: toon een afgerond-scherm

---

### 2. Reisschema (`/reisschema`)
Dag-voor-dag overzicht van de hele reis.

Per dag:
- Dagnummer + datum + stad
- Status badge (idee / gepland / geboekt / afgerond)
- Hotel van die nacht
- Activiteiten op volgorde van tijd
- Transport
- Notities

Groupering: per stad (Osaka / Kyoto / Tokyo) als sectie-header.

---

### 3. Steden (`/steden`)
Overzicht per stad met alle essentiële info.

Per stad:
- Naam + datumbereik + aantal nachten
- Hotel (naam, adres, check-in/out, bevestigingscode, link)
- Highlights / must-do lijst
- Totale kosten voor die stad (hotel + activiteiten + transport)
- Boekingsstatus van het hotel

---

### 4. Logistiek (`/logistiek`)
Alle praktische boekingen op één plek.

Twee secties:
- **Hotels:** naam, stad, data, prijs, bevestigingscode, boekingslink
- **Transport:** alle verplaatsingen chronologisch (inclusief vluchten), van→naar, datum, tijden, type, kosten

---

### 5. Budget (`/budget`)
Volledig financieel overzicht.

Blokken:
- Totaal geboekt vs. totaal geschat
- Kosten per persoon (deel door 3)
- Kosten per categorie (staafdiagram of tabel)
- Kosten per stad
- Lijst van alle uitgaven

---

### 6. Documenten (`/documenten`)
Centrale plek voor alles wat je nodig hebt.

Secties:
- **Boekingslinks:** alle links per type (boeking / kaart / info)
- **Checklist:** open en afgeronde taken
- **Notities:** vrije tekst notities per stad of algemeen

---

## Navigatie

- **Desktop:** vaste zijbalk links met alle 6 pagina's
- **Mobiel:** bottom navigation bar
- Actieve pagina duidelijk gemarkeerd
- Paginanamen: Dashboard, Reisschema, Steden, Logistiek, Budget, Documenten

---

## Design Regels

- Rustig, overzichtelijk, veel witruimte
- Geen onnodige animaties
- Duidelijke typografische hiërarchie
- Consistente statuslabels met kleur:
  - `idee` → grijs
  - `gepland` → blauw
  - `geboekt` → groen
  - `afgerond` → doorgestreept, lichtgrijs
- Mobiel-vriendelijk
- Geen paarse gradiënten of generieke AI-uitstraling

---

## Seed Data

Gebruik realistische voorbeelddata voor een Japan trip in september 2026:
- **Route:** Osaka (dag 1–5) → Kyoto (dag 6–9) → Tokyo (dag 10–14)
- **Reizigers:** 3
- **Vluchten:** Amsterdam → Osaka (Kansai), Tokyo → Amsterdam
- **Hotels:** één per stad, realistische namen en prijzen
- **Activiteiten:** bekende bezienswaardigheden per stad
- **Budget:** realistische schattingen in EUR (totaal ±€3000 per persoon)

---

## Bouwen in deze volgorde

1. Projectstructuur aanmaken
2. Data bestanden aanmaken met seed data (`/src/data/`)
3. Types definiëren (`/src/lib/types.ts`)
4. Root layout met navigatie (sidebar + mobile nav)
5. Dashboard pagina
6. Reisschema pagina
7. Steden pagina
8. Logistiek pagina
9. Budget pagina
10. Documenten pagina

---

## Belangrijke Regels

- Bouw altijd mobile-first
- Gebruik alleen shadcn/ui componenten voor UI elementen
- Geen externe API's
- Geen database
- Geen authenticatie
- Houd componenten klein en herbruikbaar
- Alle tekst in het Nederlands
