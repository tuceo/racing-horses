<template>
  <div class="header-bar">
    <h1 class="title">Racing Horses</h1>

    <div class="action-buttons">
      <button class="btn btn-generate" @click="generateProgram">Generate Program</button>

      <button class="btn btn-start" :disabled="!hasProgram" @click="toggleRace">
        {{ isRacing ? 'Pause' : 'Start Race' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeaderBar',
})

import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()

const hasProgram = computed(() => store.state.program.length > 0)
const isRacing = computed(() => store.state.isRacing)

const generateProgram = () => {
  store.dispatch('generateProgram')
}

const toggleRace = () => {
  store.commit('SET_RACING_STATUS', !isRacing.value)
}
</script>

<style src="./style.css" scoped></style>
