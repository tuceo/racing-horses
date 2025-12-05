import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { ActionContext } from 'vuex'
import type { InjectionKey } from 'vue'
import type { State, Horse, Race } from '../types'

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    horses: [] as Horse[],
    program: [] as Race[],
    results: [] as Race[],
    currentRoundIndex: 0,
    isRacing: false,
    isPaused: false,
  },
  mutations: {
    SET_HORSES(state, horses: Horse[]) {
      state.horses = horses
    },
    SET_PROGRAM(state, program: Race[]) {
      state.program = program
    },
    SET_RACING_STATUS(state, status: boolean) {
      state.isRacing = status
    },
  },
  actions: {
    generateHorses({ commit }: ActionContext<State, State>) {
      const horseColors = [
        '#e6194b',
        '#3cb44b',
        '#ffe119',
        '#4363d8',
        '#f58231',
        '#911eb4',
        '#46f0f0',
        '#f032e6',
        '#bcf60c',
        '#fabebe',
        '#008080',
        '#e6beff',
        '#9a6324',
        '#fffac8',
        '#800000',
        '#aaffc3',
        '#808000',
        '#ffd8b1',
        '#000075',
        '#808080',
      ]

      const shuffledColors = [...horseColors].sort(() => 0.5 - Math.random())

      const horseNames = [
        'Secretariat',
        'Thunderbolt',
        'Pegasus',
        'Shadowfax',
        'Seabiscuit',
        "Man o' War",
        'American Pharoah',
        'Black Caviar',
        'Red Rum',
        'Frankel',
        'Zenyatta',
        'Eclipse',
        'Phar Lap',
        'Citation',
        'Kelso',
        'Winx',
        'Spectacular Bid',
        'Nijinsky',
        'Dr Fager',
        'Affirmed',
      ]

      const shuffledNames = [...horseNames].sort(() => 0.5 - Math.random())

      const newHorses: Horse[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: shuffledNames[i] || `Horse ${i + 1}`,
        condition: Math.floor(Math.random() * 100) + 1,
        color: shuffledColors[i] || '#000000',
      }))

      commit('SET_HORSES', newHorses)
    },

    generateProgram({ state, commit }: ActionContext<State, State>) {
      const distances: number[] = [1200, 1400, 1600, 1800, 2000, 2200]

      const program: Race[] = distances.map((distance, index) => {
        const shuffled = [...state.horses].sort(() => 0.5 - Math.random())

        return {
          id: index + 1,
          distance: distance,
          horses: shuffled.slice(0, 10),
        }
      })

      commit('SET_PROGRAM', program)
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
