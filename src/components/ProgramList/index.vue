<template>
  <div class="program-list">
    <div class="list-title">
      <h2>Race Program</h2>
    </div>

    <div class="list-content">
      <div v-if="program.length === 0" class="empty-state">No program generated.</div>

      <div v-else v-for="race in program" :key="race.id" class="race-card">
        <div class="race-card-header">
          <span class="round">{{ race.round }}. Round</span>
          <span class="distance">{{ race.distance }}m</span>
        </div>

        <div class="race-list">
          <div v-for="(horse, index) in race.horses" :key="horse.id" class="race-item">
            <span class="pos">{{ index + 1 }}</span>
            <span class="p-name">{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProgramList',
})

import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()
const program = computed(() => store.state.program)
</script>

<style src="./style.css" scoped></style>
