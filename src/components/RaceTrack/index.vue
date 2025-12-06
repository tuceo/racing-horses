<template>
  <div class="track-wrapper">
    <div class="track-info">
      <h2 v-if="currentRace">
        <span class="round-indicator">ROUND {{ currentRace.round || currentRoundIndex + 1 }}</span>
        <span class="distance-indicator">{{ currentRace.distance }}m</span>
      </h2>
      <h2 v-else class="waiting">Awaiting Schedule...</h2>
    </div>

    <div class="lanes-container">
      <div class="finish-line"></div>

      <div v-for="(horse, index) in currentHorses" :key="horse.id" class="lane">
        <div class="lane-id">{{ index + 1 }}</div>

        <div
          class="horse-runner"
          :style="{
            left: getPosition(horse.id) + '%',
          }"
        >
          <RunningHorseIcon :horseColor="horse.color" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RaceTrack',
})

import { computed, ref, watch, onUnmounted } from 'vue'
import { useStore } from '../../store'
import RunningHorseIcon from '../RunningHorseIcon/index.vue'

const store = useStore()

const positions = ref<Record<number, number>>({})
const animationFrameId = ref<number | null>(null)

const program = computed(() => store.state.program)
const currentRoundIndex = computed(() => store.state.currentRoundIndex)
const isRacing = computed(() => store.state.isRacing)

const currentRace = computed(() => {
  if (!program.value.length || currentRoundIndex.value >= program.value.length) return null
  return program.value[currentRoundIndex.value]
})

const currentHorses = computed(() => {
  return currentRace.value ? currentRace.value.horses : []
})

const getPosition = (id: number) => positions.value[id] || 0
watch(
  currentHorses,
  (newHorses) => {
    const initialPos: Record<number, number> = {}
    newHorses.forEach((h) => {
      initialPos[h.id] = 0
    })
    positions.value = initialPos
  },
  { immediate: true },
)

watch(isRacing, (racing) => {
  if (racing) {
    startRaceLoop()
  } else {
    stopRaceLoop()
  }
})

const startRaceLoop = () => {
  const loop = () => {
    if (!isRacing.value) return

    let allFinished = true

    currentHorses.value.forEach((horse) => {
      const currentPos = positions.value[horse.id] || 0
      const FINISH_LINE = 90

      if (currentPos < FINISH_LINE) {
        allFinished = false
        const speed = 0.3 + horse.condition * 0.01 * Math.random()

        positions.value[horse.id] = currentPos + speed
      }
    })

    if (allFinished) {
      store.commit('SET_RACING_STATUS', false)
      console.log('Race finished!')
    } else {
      animationFrameId.value = requestAnimationFrame(loop)
    }
  }

  animationFrameId.value = requestAnimationFrame(loop)
}

const stopRaceLoop = () => {
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
}

onUnmounted(() => {
  stopRaceLoop()
})
</script>

<style src="./style.css" scoped></style>
