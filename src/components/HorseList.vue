<template>
  <div class="panel-container">
    <div class="panel-header">
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
            <td class="cond-cell">
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
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()
const horses = computed(() => store.state.horses)

const getConditionColor = (val: number) => {
  if (val > 80) return '#22c55e'
  if (val > 50) return '#eab308'
  return '#ef4444'
}
</script>

<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  background-color: #f8fafc;
  padding: 15px;
  border-bottom: 1px solid #e2e8f0;
}
.panel-header h2 {
  margin: 0;
  font-size: 16px;
  color: #334155;
  font-weight: 700;
}

.list-content {
  overflow-y: auto;
  flex-grow: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th {
  text-align: left;
  padding: 12px 15px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 1;
}
td {
  padding: 10px 15px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
tr:last-child td {
  border-bottom: none;
}
tr:hover {
  background-color: #f8fafc;
}

.name-cell {
  font-weight: 500;
}
.color-dot {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.cond-bar {
  width: 40px;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}
.cond-fill {
  height: 100%;
  border-radius: 2px;
}
</style>
