import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceSchedule from '../index.vue'
import { storeOptions, key } from '@/store'

describe('RaceSchedule tests', () => {
  it('should render empty state when no program exists', () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [],
        results: [],
      },
    })

    const wrapper = mount(RaceSchedule, {
      global: { plugins: [[mockStore, key]] },
    })

    expect(wrapper.text()).toContain('No program generated.')
    expect(wrapper.findAll('.round-card').length).toBe(0)
  })

  it('should render program details with pending results', () => {
    const mockProgram = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [
          { id: 1, name: 'Horse A', condition: 50, color: 'red' },
          { id: 2, name: 'Horse B', condition: 60, color: 'blue' },
        ],
      },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: mockProgram,
        results: [],
      },
    })

    const wrapper = mount(RaceSchedule, {
      global: { plugins: [[mockStore, key]] },
    })

    expect(wrapper.text()).toContain('1. Round')
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.text()).toContain('Horse A')
    expect(wrapper.text()).toContain('- Pending -')
    expect(wrapper.findAll('.horse-row').length).toBe(2)
  })

  it('should render results and highlights winner when results exist', () => {
    const mockProgram = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [
          { id: 1, name: 'Horse A', condition: 50, color: 'red' },
          { id: 2, name: 'Horse B', condition: 60, color: 'blue' },
        ],
      },
    ]

    const mockResults = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [
          { id: 2, name: 'Horse B', condition: 60, color: 'blue' },
          { id: 1, name: 'Horse A', condition: 50, color: 'red' },
        ],
      },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: mockProgram,
        results: mockResults,
      },
    })

    const wrapper = mount(RaceSchedule, {
      global: { plugins: [[mockStore, key]] },
    })

    expect(wrapper.text()).not.toContain('- Pending -')

    const resultRows = wrapper.findAll('.table-col')[1].findAll('.horse-row')
    expect(resultRows.length).toBe(2)

    const winnerRow = wrapper.find('.winner-row')
    expect(winnerRow.exists()).toBe(true)
    expect(winnerRow.text()).toContain('Horse B')
  })
})
