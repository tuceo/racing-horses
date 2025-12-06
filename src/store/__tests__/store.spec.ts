import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { storeOptions } from '../index'

describe('Vuex Store tests', () => {
  let store

  beforeEach(() => {
    store = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
      },
    })
  })

  it('should generate horses based on constants', () => {
    store.dispatch('generateHorses')
    expect(store.state.horses.length).toBe(20)
  })

  it('should generate valid horse data', () => {
    store.dispatch('generateHorses')
    const horse = store.state.horses[0]

    expect(horse.id).toBe(1)
    expect(horse.condition).toBeGreaterThanOrEqual(1)
    expect(horse.condition).toBeLessThanOrEqual(100)
    expect(horse.color).toBeDefined()
  })

  it('should generate a program with correct rounds', () => {
    store.dispatch('generateHorses')
    store.dispatch('generateProgram')

    expect(store.state.program.length).toBe(6)

    const firstRound = store.state.program[0]
    expect(firstRound.round).toBe(1)
    expect(firstRound.horses.length).toBe(10)
  })

  it('should clear previous results when generating new program', () => {
    store.state.results = [{ id: 1, round: 1, horses: [] }]
    store.state.currentRoundIndex = 5

    store.dispatch('generateProgram')

    expect(store.state.results.length).toBe(0)
    expect(store.state.currentRoundIndex).toBe(0)
  })
})
