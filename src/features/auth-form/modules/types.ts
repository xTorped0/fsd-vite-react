export interface authData {
  token: string | null
  card: Card | null
  clientId?: string
  formation?: Formation
  parentFormation?: any
  jobposition?: Jobposition
  appVersion?: string
  stgrName?: any
  stgrUuid?: any
  stgrId?: any
  organId?: any
}

interface CardAuthed extends Card {
  clientId?: string
  formation?: Formation
  parentFormation?: any
  jobposition?: Jobposition
  appVersion?: string
  stgrName?: any
  stgrUuid?: any
  stgrId?: any
  organId?: any
}

export interface Auth {
  token: string | null
  user: CardAuthed | null
}

export interface Card {
  id: number
  name: string
  surname: string
  patronymic: string
  gender: string
  birthdate: number
  personalNo: number
  identityDoc: string
  civilInfo: any
  duty: Duty
  rank: Rank
  uuid: string
  healthStatus: number
  organNumber: number
  commanderUuid: any
}

export interface Duty {
  id: number
  type: string
  startDate: number
  endDate: number
  recruitment: Recruitment
}

export interface Recruitment {
  id: number
  place: string
  recruitmentCode: string
}

export interface Rank {
  id: number
  name: string
  category: Category
  rankType: string
  insignia: string
}

export interface Category {
  id: number
  name: string
}

export interface Formation {
  id: number
  name: string
  shortName: string
  type: string
  sidc: string
  uuid: string
  activityTypes: ActivityType[]
}

export interface ActivityType {
  id: number
  name: string
  index: string
}

export interface Jobposition {
  id: number
  name: string
  callsign: string
  combatant: boolean
  militaryProfession: string
  sidc: string
  uuid: string
  rank: Rank2
  equipmentTypes: any[]
  activityType: ActivityType2
}

export interface Rank2 {
  id: number
  name: string
  category: Category2
  rankType: string
  insignia: string
}

export interface Category2 {
  id: number
  name: string
}

export interface ActivityType2 {
  id: number
  name: string
  index: string
}
