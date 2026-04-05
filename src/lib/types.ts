export interface Reis {
  naam: string
  startDatum: string
  eindDatum: string
  reizigers: number
  valuta: string
  reizigersnamen: string[]
}

export interface Hotel {
  naam: string
  adres: string
  checkIn: string
  checkOut: string
  prijsTotaal: number
  boekingslink: string
  bevestigingsCode: string
}

export interface StadVerblijf {
  id: string
  stad: string
  startDatum: string
  eindDatum: string
  volgorde: number
  hotel: Hotel
  highlights: string[]
}

export interface Activiteit {
  naam: string
  startTijd: string
  eindTijd: string
  locatie: string
  kosten: number
  status: 'idee' | 'gepland'
  notities: string
}

export interface Transport {
  type: 'vlucht' | 'trein' | 'metro' | 'taxi' | 'bus' | 'lopen'
  van: string
  naar: string
  vertrekTijd: string
  aankomstTijd: string
  kosten: number
  notities: string
}

export interface DagPlan {
  id: string
  datum: string
  dagNummer: number
  stad: string
  status: 'idee' | 'gepland' | 'afgerond'
  reisdag?: boolean
  activiteiten: Activiteit[]
  transport: Transport[]
  notities: string
}

export interface Uitgave {
  id: string
  datum: string
  categorie: 'vlucht' | 'hotel' | 'transport' | 'eten' | 'activiteit' | 'overig'
  omschrijving: string
  bedrag: number
  geboekt: boolean
}

export interface LinkItem {
  id: string
  label: string
  url: string
  type: 'boeking' | 'kaart' | 'info' | 'overig'
}

export interface Notitie {
  id: string
  titel: string
  inhoud: string
  stad?: string
}
