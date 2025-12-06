import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HeaderBar from '../index.vue'
import { storeOptions, key } from '@/store'

describe('HeaderBar tests', () => {
  it('should disable Start button initially (no program)', () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [],
      },
    })

    const wrapper = mount(HeaderBar, {
      global: { plugins: [[mockStore, key]] },
    })

    const startBtn = wrapper.find('.btn-start')
    expect(startBtn.element.hasAttribute('disabled')).toBe(true)
  })

  it('should enable Start button when program is generated', () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [{ id: 1, round: 1, distance: 1200, horses: [] }],
        currentRoundIndex: 0,
      },
    })

    const wrapper = mount(HeaderBar, {
      global: { plugins: [[mockStore, key]] },
    })

    const startBtn = wrapper.find('.btn-start')
    expect(startBtn.element.hasAttribute('disabled')).toBe(false)
    expect(startBtn.text()).toBe('Start Race')
  })

  it('should show "Pause" when race is running', () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [{ id: 1, round: 1, distance: 1200, horses: [] }],
        currentRoundIndex: 0,
        isRacing: true,
      },
    })

    const wrapper = mount(HeaderBar, {
      global: { plugins: [[mockStore, key]] },
    })

    const startBtn = wrapper.find('.btn-start')
    expect(startBtn.text()).toBe('Pause')
  })

  it('should dispatch generateProgram when Generate button is clicked', async () => {
    const mockStore = createStore({ ...storeOptions })

    const dispatchSpy = vi.spyOn(mockStore, 'dispatch')

    const wrapper = mount(HeaderBar, {
      global: { plugins: [[mockStore, key]] },
    })

    await wrapper.find('.btn-generate').trigger('click')

    expect(dispatchSpy).toHaveBeenCalledWith('generateProgram')
  })

  it('should commit SET_RACING_STATUS when Start button is clicked', async () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [{ id: 1, round: 1, distance: 1200, horses: [] }],
        isRacing: false,
      },
    })

    const commitSpy = vi.spyOn(mockStore, 'commit')

    const wrapper = mount(HeaderBar, {
      global: { plugins: [[mockStore, key]] },
    })

    await wrapper.find('.btn-start').trigger('click')

    expect(commitSpy).toHaveBeenCalledWith('SET_RACING_STATUS', true)
  })
})
