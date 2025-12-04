<template>
  <div class="app-container">
    <ControlPanel />

    <div class="main-layout">
      <div class="sidebar left-sidebar">
        <HorseList />
      </div>

      <main class="center-stage">
        <RaceTrack />
      </main>

      <aside class="sidebar right-sidebar">
        <ProgramList />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from './store'
import HorseList from './components/HorseList.vue'
import ControlPanel from './components/HeaderBar.vue'
import ProgramList from './components/ProgramList.vue'
import RaceTrack from './components/RaceTrack.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('generateHorses')
})
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f1f5f9;
  color: #1e293b;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
  height: calc(100vh - 115px);
}

.sidebar,
.center-stage {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.left-sidebar {
  flex: 0 0 280px;
}
.center-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.right-sidebar {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
}
</style>
