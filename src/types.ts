export interface Horse {
  id: number
  name: string
  condition: number
  color: string
}

export interface Race {
  id: number
  distance: number
  horses: Horse[]
  results?: Horse[]
}

export interface State {
  horses: Horse[]
  program: Race[]
  results: Race[]
  currentRoundIndex: number
  isRacing: boolean
  isPaused: boolean
}
