<template>
  <div class="header-bar">
    <h1 class="title">Racing Horses</h1>

    <div class="action-buttons">
      <button class="btn btn-generate" @click="generateSchedule">Generate Program</button>
      <button class="btn btn-start" disabled>Start Race</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store'
const store = useStore()
const generateSchedule = () => store.dispatch('generateProgram')
</script>

<style scoped>
.header-bar {
  background-color: #1e293b;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.title {
  font-size: 18px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;
  font-size: 14px;
  text-transform: uppercase;
}

.btn-generate {
  background-color: #3b82f6;
  color: white;
}
.btn-generate:hover {
  background-color: #2563eb;
}

.btn-start {
  background-color: #10b981;
  color: white;
}
.btn-start:disabled {
  background-color: #475569;
  cursor: default;
  opacity: 0.7;
}
</style>
