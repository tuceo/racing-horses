<template>
  <div class="result-list">
    <div class="list-title">
      <h2>Race Results</h2>
    </div>

    <div class="list-content">
      <div v-if="results.length === 0" class="empty-state">Waiting for results...</div>

      <div v-else v-for="race in results" :key="race.round" class="result-card">
        <div class="result-header">
          <span>{{ race.round }}. Round</span>
          <span>{{ race.distance }}m</span>
        </div>

        <div class="result-rows">
          <div v-for="(horse, index) in race.horses" :key="horse.id" class="result-row">
            <span class="rank">{{ index + 1 }}</span>
            <span class="name">{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ResultList',
})

import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()
const results = computed(() => store.state.results)
</script>

<style src="./style.css" scoped></style>
