import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { ActionContext } from 'vuex'
import type { InjectionKey } from 'vue'
import type { State, Horse, Race } from '../utils/types'
import { Distances, HorseColors, HorseNames } from '@/utils/constants'

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
    ADD_RESULT(state, result: Race) {
      state.results.push(result)
    },
    NEXT_ROUND(state) {
      state.currentRoundIndex++
    },
    SET_RACING_STATUS(state, status: boolean) {
      state.isRacing = status
    },
    CLEAR_DATA(state) {
      state.results = []
      state.currentRoundIndex = 0
    },
  },
  actions: {
    generateHorses({ commit }: ActionContext<State, State>) {
      const shuffledColors = [...HorseColors].sort(() => 0.5 - Math.random())

      const horses = HorseNames.map((name, i) => ({
        id: i + 1,
        name,
        condition: Math.floor(Math.random() * 100) + 1,
        color: shuffledColors[i] || '#000000',
      }))

      commit('SET_HORSES', horses)
    },

    generateProgram({ state, commit }: ActionContext<State, State>) {
      commit('CLEAR_DATA')

      const program = Distances.map((distance, index) => {
        const shuffled = [...state.horses].sort(() => 0.5 - Math.random())
        return {
          id: index + 1,
          round: index + 1,
          distance: distance,
          horses: shuffled.slice(0, 10),
        }
      })

      commit('SET_PROGRAM', program)
    },

    finishRound({ commit, state }, finishedHorses: Horse[]) {
      const currentRace = state.program[state.currentRoundIndex]

      const raceResult = {
        ...currentRace,
        horses: finishedHorses,
      }

      commit('ADD_RESULT', raceResult)
      commit('SET_RACING_STATUS', false)
      commit('NEXT_ROUND')
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
