import type { LinkItem, Taak, Notitie } from '@/lib/types'

export const links: LinkItem[] = [
  // Boekingen
  {
    id: 'link-001',
    label: 'KLM vlucht AMS → KIX (bevestiging)',
    url: 'https://www.klm.com/travel/nl_nl/apps/ebt/ebt_home.htm',
    type: 'boeking',
  },
  {
    id: 'link-002',
    label: 'KLM vlucht NRT → AMS (bevestiging)',
    url: 'https://www.klm.com/travel/nl_nl/apps/ebt/ebt_home.htm',
    type: 'boeking',
  },
  {
    id: 'link-003',
    label: 'Hotel Monterey Grasmere Osaka (Booking.com)',
    url: 'https://www.booking.com',
    type: 'boeking',
  },
  {
    id: 'link-004',
    label: 'Hotel Granvia Kyoto (Booking.com)',
    url: 'https://www.booking.com',
    type: 'boeking',
  },
  {
    id: 'link-005',
    label: 'Shinjuku Granbell Hotel Tokyo (Booking.com)',
    url: 'https://www.booking.com',
    type: 'boeking',
  },
  {
    id: 'link-006',
    label: 'JR Pass bestelling',
    url: 'https://www.jrpass.com',
    type: 'boeking',
  },
  {
    id: 'link-007',
    label: 'Universal Studios Japan tickets',
    url: 'https://www.usj.co.jp/web/en/us',
    type: 'boeking',
  },
  {
    id: 'link-008',
    label: 'teamLab Borderless tickets',
    url: 'https://borderless.teamlab.art',
    type: 'boeking',
  },

  // Kaarten
  {
    id: 'link-009',
    label: 'Google Maps — Osaka',
    url: 'https://maps.google.com',
    type: 'kaart',
  },
  {
    id: 'link-010',
    label: 'Google Maps — Kyoto',
    url: 'https://maps.google.com',
    type: 'kaart',
  },
  {
    id: 'link-011',
    label: 'Google Maps — Tokyo',
    url: 'https://maps.google.com',
    type: 'kaart',
  },
  {
    id: 'link-012',
    label: 'Japan treinenkaart (HyperDia)',
    url: 'https://www.hyperdia.com',
    type: 'kaart',
  },

  // Info
  {
    id: 'link-013',
    label: 'Japan visuminformatie (Japanse ambassade)',
    url: 'https://www.nl.emb-japan.go.jp',
    type: 'info',
  },
  {
    id: 'link-014',
    label: 'Japan Travel — officiële toerismegids',
    url: 'https://www.japan.travel/nl/nl/',
    type: 'info',
  },
  {
    id: 'link-015',
    label: 'Wisselkoers EUR/JPY (Google)',
    url: 'https://www.google.com/search?q=eur+jpy',
    type: 'info',
  },
]

export const taken: Taak[] = [
  {
    id: 'taak-001',
    titel: 'Vluchten boeken (KLM AMS ↔ Japan)',
    status: 'afgerond',
    vervaldatum: '2025-12-01',
  },
  {
    id: 'taak-002',
    titel: 'Hotels boeken (Osaka, Kyoto, Tokyo)',
    status: 'afgerond',
    vervaldatum: '2026-01-15',
  },
  {
    id: 'taak-003',
    titel: 'JR Pass bestellen (14 dagen)',
    status: 'afgerond',
    vervaldatum: '2026-06-01',
  },
  {
    id: 'taak-004',
    titel: 'Universal Studios tickets reserveren',
    status: 'afgerond',
    vervaldatum: '2026-06-01',
  },
  {
    id: 'taak-005',
    titel: 'teamLab Borderless tickets reserveren',
    status: 'afgerond',
    vervaldatum: '2026-07-01',
  },
  {
    id: 'taak-006',
    titel: 'Reisverzekering afsluiten',
    status: 'afgerond',
    vervaldatum: '2026-07-01',
  },
  {
    id: 'taak-007',
    titel: 'Pocket WiFi reserveren',
    status: 'open',
    vervaldatum: '2026-08-01',
  },
  {
    id: 'taak-008',
    titel: 'Japanse yen wisselen (€200 p.p. contant)',
    status: 'open',
    vervaldatum: '2026-08-25',
  },
  {
    id: 'taak-009',
    titel: 'Reisschema definitief maken (Nara/Nikko dagtrip)',
    status: 'open',
    vervaldatum: '2026-08-01',
  },
  {
    id: 'taak-010',
    titel: 'Check paspoorten geldigheid (min. 6 maanden na terugkomst)',
    status: 'open',
    vervaldatum: '2026-06-01',
  },
  {
    id: 'taak-011',
    titel: 'EHIC / zorgpas meenemen of aanvragen',
    status: 'open',
    vervaldatum: '2026-08-01',
  },
  {
    id: 'taak-012',
    titel: 'Noodcontacten en ambassadegegevens opslaan',
    status: 'open',
    vervaldatum: '2026-08-25',
  },
]

export const notities: Notitie[] = [
  {
    id: 'notitie-001',
    titel: 'Algemene reisinformatie',
    inhoud: `Japan is over het algemeen erg veilig. Laat bagage onbeheerd achter in treinstations is normaal.

Betalingen: Japan is nog veel cash. Neem voldoende yen mee. 7-Eleven en PostBank geldautomaten accepteren buitenlandse kaarten.

Etiquette: Schoenen uit bij tempels (let op teken). Eet niet wandelend. Wijs met twee handen dingen aan.

Apps die handig zijn:
- Google Maps (offline opslaan!)
- Google Translate (camera functie voor menu's)
- HyperDia voor treinreisinformatie`,
    stad: undefined,
  },
  {
    id: 'notitie-002',
    titel: 'Osaka tips',
    inhoud: `Dotonbori is 's avonds het drukst en sfeervolst. Probeer Ichiran ramen (solo ramen hokjes) en takoyaki van Aizuya.

Osaka hebben eigen trots op hun keuken: "kuidaore" (eten tot je omvalt). Budget iets meer voor eten hier.

Osaka Amazing Pass geeft gratis metro + toegang tot attracties — vergelijk met losse kaartjes.`,
    stad: 'Osaka',
  },
  {
    id: 'notitie-003',
    titel: 'Kyoto tips',
    inhoud: `Fushimi Inari is 24/7 open en gratis. Vroeg gaan (voor 08:00) voor de mooiste foto's zonder mensen.

In Gion: respecteer de privacy van bewoners. Niet in privésteegjes lopen. Geisha's zijn geen toeristische attractie.

Bus day pass (600 yen) is nuttig voor Arashiyama en rondreis langs tempels.`,
    stad: 'Kyoto',
  },
  {
    id: 'notitie-004',
    titel: 'Tokyo tips',
    inhoud: `Tokyo Metro dagpas is de moeite waard. JR Pass dekt de JR lijnen maar niet de metro.

Shibuya Crossing: ga naar de Starbucks op de eerste verdieping voor een geweldig uitzicht.

Winkelen in Shibuya 109 (mode), Nakameguro (vintage/design), Akihabara (elektronica/anime).

Shinjuku Golden Gai: kleine, sfeervolle kroegjes. Sommige "locals only", anderen verwelkomen toeristen.`,
    stad: 'Tokyo',
  },
]
