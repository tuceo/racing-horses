<template>
  <div class="schedule-container">
    <div class="panel-header">
      <h2>Race Schedule & Results</h2>
    </div>

    <div class="scroll-content">
      <div v-if="program.length === 0" class="empty-state">No program generated.</div>

      <div v-else v-for="(race, index) in program" :key="race.round" class="round-card">
        <div class="card-header">
          <span>{{ race.round }}. Round</span>
          <span>{{ race.distance }}m</span>
        </div>

        <div class="tables-row">
          <div class="table-col">
            <div class="col-header">Program</div>
            <div v-for="(horse, horseIndex) in race.horses" :key="horse.id" class="horse-row">
              <span class="pos">{{ horseIndex + 1 }}</span>
              <span class="name">{{ horse.name }}</span>
            </div>
          </div>

          <div class="table-col">
            <div class="col-header" style="color: #166534">Result</div>

            <div v-if="results[index]">
              <div
                v-for="(horse, horseIndex) in results[index].horses"
                :key="horse.id"
                class="horse-row"
                :class="{ 'winner-row': horseIndex === 0 }"
              >
                <span class="pos">{{ horseIndex + 1 }}</span>
                <span class="name">{{ horse.name }}</span>
              </div>
            </div>

            <div v-else style="padding: 20px; text-align: center; color: #cbd5e1; font-size: 11px">
              - Pending -
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RaceSchedule',
})

import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()
const program = computed(() => store.state.program)
const results = computed(() => store.state.results)
</script>

<style src="./style.css" scoped></style>
