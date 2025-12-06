import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RaceTrack from '../index.vue'
import { storeOptions, key } from '@/store'

const RunningHorseIconStub = { template: '<div class="horse-icon-stub"></div>' }

describe('RaceTrack tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render waiting message when program is empty', () => {
    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: [],
        currentRoundIndex: 0,
      },
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [[mockStore, key]],
        stubs: { RunningHorseIcon: RunningHorseIconStub },
      },
    })

    expect(wrapper.text()).toContain('Awaiting Schedule...')
    expect(wrapper.findAll('.lane').length).toBe(0)
  })

  it('should render correct round info and lanes when program exists', () => {
    const mockProgram = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [
          { id: 1, name: 'Secretariat', condition: 80, color: 'red' },
          { id: 2, name: 'Bolt', condition: 70, color: 'blue' },
        ],
      },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: mockProgram,
        currentRoundIndex: 0,
      },
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [[mockStore, key]],
        stubs: { RunningHorseIcon: RunningHorseIconStub },
      },
    })

    expect(wrapper.text()).toContain('ROUND 1')
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.findAll('.lane').length).toBe(2)
    expect(wrapper.findAll('.horse-icon-stub').length).toBe(2)
  })

  it('should initialize horse positions at 0%', () => {
    const mockProgram = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [{ id: 1, name: 'H1', condition: 50, color: 'red' }],
      },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: mockProgram,
        currentRoundIndex: 0,
      },
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [[mockStore, key]],
        stubs: { RunningHorseIcon: RunningHorseIconStub },
      },
    })

    const horseRunner = wrapper.find('.horse-runner')
    expect(horseRunner.attributes('style')).toContain('left: 0%')
  })

  it('should start animation loop when isRacing state becomes true', async () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame')

    const mockProgram = [
      {
        id: 1,
        round: 1,
        distance: 1200,
        horses: [{ id: 1, name: 'H1', condition: 50, color: 'red' }],
      },
    ]

    const mockStore = createStore({
      ...storeOptions,
      state: {
        ...storeOptions.state,
        program: mockProgram,
        currentRoundIndex: 0,
        isRacing: false,
      },
    })

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [[mockStore, key]],
        stubs: { RunningHorseIcon: RunningHorseIconStub },
      },
    })

    mockStore.state.isRacing = true
    await wrapper.vm.$nextTick()

    expect(rafSpy).toHaveBeenCalled()
  })
})
