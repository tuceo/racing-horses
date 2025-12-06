<template>
  <div class="track-wrapper">
    <div class="track-info">
      <h2 v-if="currentRace">
        <span class="round-indicator">ROUND {{ currentRace.round }}</span>
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
import RunningHorseIcon from '../RunningHorseIcon/index.vue'
import { useStore } from '../../store'

const store = useStore()

const positions = ref<Record<number, number>>({})
const animationFrameId = ref<number | null>(null)
const finishedRanking = ref<number[]>([])

const program = computed(() => store.state.program)
const currentRoundIndex = computed(() => store.state.currentRoundIndex)
const isRacing = computed(() => store.state.isRacing)

const currentRace = computed(() => {
  if (!program.value.length) return null
  if (currentRoundIndex.value >= program.value.length) return null
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
    finishedRanking.value = []
  },
  { immediate: true },
)

watch(isRacing, (racing) => {
  if (racing) startRaceLoop()
  else stopRaceLoop()
})

const startRaceLoop = () => {
  const loop = () => {
    if (!isRacing.value) return

    currentHorses.value.forEach((horse) => {
      const currentPos = positions.value[horse.id] || 0
      const FINISH_LINE = 90

      if (currentPos < FINISH_LINE) {
        const speed = 0.8 + horse.condition * 0.01 * Math.random()
        const newPos = currentPos + speed

        positions.value[horse.id] = newPos

        if (newPos >= FINISH_LINE) {
          if (!finishedRanking.value.includes(horse.id)) {
            finishedRanking.value.push(horse.id)
          }
        }
      }
    })

    if (finishedRanking.value.length === currentHorses.value.length) {
      handleRaceFinish()
    } else {
      animationFrameId.value = requestAnimationFrame(loop)
    }
  }

  animationFrameId.value = requestAnimationFrame(loop)
}

const handleRaceFinish = () => {
  stopRaceLoop()

  const sortedResults = finishedRanking.value.map(
    (id) => currentHorses.value.find((h) => h.id === id)!,
  )

  store.dispatch('finishRound', sortedResults)
}

const stopRaceLoop = () => {
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
}

onUnmounted(() => {
  stopRaceLoop()
})
</script>

<style src="./style.css" scoped></style>
