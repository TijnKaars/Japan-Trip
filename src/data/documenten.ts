import type { LinkItem, Notitie } from '@/lib/types'

export const links: LinkItem[] = [
  // Boekingen
  {
    id: 'link-001',
    label: 'KLM vlucht AMS → KIX',
    url: 'https://www.klm.com',
    type: 'boeking',
  },
  {
    id: 'link-002',
    label: 'KLM vlucht NRT → AMS',
    url: 'https://www.klm.com',
    type: 'boeking',
  },
  {
    id: 'link-003',
    label: 'Hotel Monterey Grasmere Osaka',
    url: 'https://www.booking.com',
    type: 'boeking',
  },
  {
    id: 'link-004',
    label: 'Hotel Granvia Kyoto',
    url: 'https://www.booking.com',
    type: 'boeking',
  },
  {
    id: 'link-005',
    label: 'Shinjuku Granbell Hotel Tokyo',
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
    label: 'Japan treinenkaart (HyperDia)',
    url: 'https://www.hyperdia.com',
    type: 'kaart',
  },
  {
    id: 'link-010',
    label: 'Google Maps — Osaka',
    url: 'https://maps.google.com',
    type: 'kaart',
  },
  {
    id: 'link-011',
    label: 'Google Maps — Kyoto',
    url: 'https://maps.google.com',
    type: 'kaart',
  },
  {
    id: 'link-012',
    label: 'Google Maps — Tokyo',
    url: 'https://maps.google.com',
    type: 'kaart',
  },

  // Info
  {
    id: 'link-013',
    label: 'Japan Travel — officiële toerismegids',
    url: 'https://www.japan.travel/nl/nl/',
    type: 'info',
  },
  {
    id: 'link-014',
    label: 'Wisselkoers EUR/JPY',
    url: 'https://www.google.com/search?q=eur+jpy',
    type: 'info',
  },
  {
    id: 'link-015',
    label: 'Japan visuminformatie',
    url: 'https://www.nl.emb-japan.go.jp',
    type: 'info',
  },
]

export const notities: Notitie[] = [
  {
    id: 'notitie-001',
    titel: 'Algemeen',
    inhoud: `Japan is over het algemeen erg veilig.

Betalingen: Japan is nog veel cash. Neem voldoende yen mee. 7-Eleven en PostBank geldautomaten accepteren buitenlandse kaarten.

Etiquette: Schoenen uit bij tempels. Eet niet wandelend.

Handige apps: Google Maps (offline opslaan), Google Translate (camerafunctie voor menu's), HyperDia voor treinen.`,
    stad: undefined,
  },
  {
    id: 'notitie-002',
    titel: 'Tips Osaka',
    inhoud: `Dotonbori is 's avonds het drukst en sfeervolst. Probeer Ichiran ramen en takoyaki van Aizuya.

Osaka heeft eigen trots op hun keuken: "kuidaore" (eten tot je omvalt). Budget iets meer voor eten hier.

Osaka Amazing Pass geeft gratis metro + toegang tot attracties — vergelijk met losse kaartjes.`,
    stad: 'Osaka',
  },
  {
    id: 'notitie-003',
    titel: 'Tips Kyoto',
    inhoud: `Fushimi Inari is 24/7 open en gratis. Vroeg gaan (voor 08:00) voor de mooiste foto's zonder mensen.

In Gion: respecteer de privacy van bewoners. Niet in privésteegjes lopen.

Bus day pass (600 yen) is nuttig voor Arashiyama en rondreis langs tempels.`,
    stad: 'Kyoto',
  },
  {
    id: 'notitie-004',
    titel: 'Tips Tokyo',
    inhoud: `Tokyo Metro dagpas is de moeite waard. JR Pass dekt de JR lijnen maar niet de metro.

Shibuya Crossing: ga naar de Starbucks op de eerste verdieping voor een geweldig uitzicht.

Shinjuku Golden Gai: kleine, sfeervolle kroegjes. Sommige "locals only", anderen verwelkomen toeristen.`,
    stad: 'Tokyo',
  },
]
