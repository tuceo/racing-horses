import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HorseList from '../index.vue'
import { storeOptions, key } from '@/store'

describe('HorseList tests', () => {
  it('should render horse list correctly with styles', () => {
    const mockHorses = [
      { id: 1, name: 'Seabiscuit', condition: 50, color: 'red' },
      { id: 2, name: 'Black Caviar', condition: 90, color: 'blue' },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        horses: mockHorses,
      },
    })

    const wrapper = mount(HorseList, {
      global: {
        plugins: [[mockStore, key]],
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)

    const firstRow = rows[0]
    expect(firstRow.find('.name-cell').text()).toBe('Seabiscuit')

    const condFill = firstRow.find('.cond-fill')
    expect(condFill.attributes('style')).toContain('width: 50%')

    const colorDot = firstRow.find('.color-dot')
    expect(colorDot.attributes('style')).toContain('background-color: red')
  })
})
