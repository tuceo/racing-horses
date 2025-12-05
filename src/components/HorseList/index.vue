<template>
  <div class="horse-list">
    <div class="list-title">
      <h2>Horses (1-20)</h2>
    </div>

    <div class="list-content">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cond.</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td class="name-cell">{{ horse.name }}</td>
            <td class="cond-cell" :title="`Condition: ${horse.condition}`">
              <div class="cond-bar">
                <div
                  class="cond-fill"
                  :style="{
                    width: horse.condition + '%',
                    backgroundColor: getConditionColor(horse.condition),
                  }"
                ></div>
              </div>
            </td>
            <td>
              <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HorseList',
})

import { computed } from 'vue'
import { useStore } from '../../store'

const store = useStore()
const horses = computed(() => store.state.horses)

const getConditionColor = (val: number) => {
  if (val > 80) return '#22c55e'
  if (val > 50) return '#eab308'
  return '#ef4444'
}
</script>

<style src="./style.css" scoped></style>
