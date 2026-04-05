import type { Uitgave } from '@/lib/types'

export const uitgaven: Uitgave[] = [
  // Vluchten
  {
    id: 'uig-001',
    datum: '2026-09-01',
    categorie: 'vlucht',
    omschrijving: 'KLM Amsterdam (AMS) → Osaka Kansai (KIX) — 3 personen',
    bedrag: 2760,
    geboekt: true,
  },
  {
    id: 'uig-002',
    datum: '2026-09-14',
    categorie: 'vlucht',
    omschrijving: 'KLM Tokyo Narita (NRT) → Amsterdam (AMS) — 3 personen',
    bedrag: 0,
    geboekt: true,
  },

  // Hotels
  {
    id: 'uig-003',
    datum: '2026-09-01',
    categorie: 'hotel',
    omschrijving: 'Hotel Monterey Grasmere Osaka — 4 nachten',
    bedrag: 720,
    geboekt: true,
  },
  {
    id: 'uig-004',
    datum: '2026-09-06',
    categorie: 'hotel',
    omschrijving: 'Hotel Granvia Kyoto — 3 nachten',
    bedrag: 756,
    geboekt: true,
  },
  {
    id: 'uig-005',
    datum: '2026-09-10',
    categorie: 'hotel',
    omschrijving: 'Shinjuku Granbell Hotel Tokyo — 4 nachten',
    bedrag: 960,
    geboekt: true,
  },

  // Transport
  {
    id: 'uig-006',
    datum: '2026-09-01',
    categorie: 'transport',
    omschrijving: 'JR Pass 14 dagen — 3 personen',
    bedrag: 1560,
    geboekt: true,
  },
  {
    id: 'uig-007',
    datum: '2026-09-01',
    categorie: 'transport',
    omschrijving: 'IC Card (Suica/ICOCA) opwaarderen — schatting 3 personen',
    bedrag: 120,
    geboekt: false,
  },
  {
    id: 'uig-008',
    datum: '2026-09-01',
    categorie: 'transport',
    omschrijving: 'Nankai Rapi:t Express KIX → Namba — 3 personen',
    bedrag: 27,
    geboekt: false,
  },

  // Activiteiten
  {
    id: 'uig-009',
    datum: '2026-09-03',
    categorie: 'activiteit',
    omschrijving: 'Universal Studios Japan tickets — 3 personen',
    bedrag: 270,
    geboekt: true,
  },
  {
    id: 'uig-010',
    datum: '2026-09-06',
    categorie: 'activiteit',
    omschrijving: 'Kinkaku-ji entree — 3 personen',
    bedrag: 12,
    geboekt: false,
  },
  {
    id: 'uig-011',
    datum: '2026-09-07',
    categorie: 'activiteit',
    omschrijving: 'Tenryu-ji tuin Arashiyama — 3 personen',
    bedrag: 18,
    geboekt: false,
  },
  {
    id: 'uig-012',
    datum: '2026-09-10',
    categorie: 'activiteit',
    omschrijving: 'Tokyo Skytree Tembo Deck — 3 personen',
    bedrag: 60,
    geboekt: false,
  },
  {
    id: 'uig-013',
    datum: '2026-09-11',
    categorie: 'activiteit',
    omschrijving: 'teamLab Borderless tickets — 3 personen',
    bedrag: 90,
    geboekt: true,
  },
  {
    id: 'uig-014',
    datum: '2026-09-02',
    categorie: 'activiteit',
    omschrijving: 'Osaka Castle museum — 3 personen',
    bedrag: 18,
    geboekt: false,
  },

  // Eten
  {
    id: 'uig-015',
    datum: '2026-09-01',
    categorie: 'eten',
    omschrijving: 'Eten & drinken Osaka (5 dagen) — schatting 3 personen',
    bedrag: 450,
    geboekt: false,
  },
  {
    id: 'uig-016',
    datum: '2026-09-06',
    categorie: 'eten',
    omschrijving: 'Eten & drinken Kyoto (4 dagen) — schatting 3 personen',
    bedrag: 360,
    geboekt: false,
  },
  {
    id: 'uig-017',
    datum: '2026-09-10',
    categorie: 'eten',
    omschrijving: 'Eten & drinken Tokyo (5 dagen) — schatting 3 personen',
    bedrag: 450,
    geboekt: false,
  },

  // Overig
  {
    id: 'uig-018',
    datum: '2026-09-01',
    categorie: 'overig',
    omschrijving: 'Reisverzekering — 3 personen',
    bedrag: 180,
    geboekt: true,
  },
  {
    id: 'uig-019',
    datum: '2026-09-01',
    categorie: 'overig',
    omschrijving: 'Pocket WiFi huur 14 dagen',
    bedrag: 70,
    geboekt: false,
  },
  {
    id: 'uig-020',
    datum: '2026-09-01',
    categorie: 'overig',
    omschrijving: 'Souvenirs & winkelen — schatting 3 personen',
    bedrag: 300,
    geboekt: false,
  },
]
