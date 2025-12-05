<template>
  <div class="container">
    <HeaderBar />

    <div class="layout">
      <div class="sidebar left-sidebar">
        <HorseList />
      </div>

      <main class="center">
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
import HorseList from './components/HorseList/index.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import ProgramList from './components/ProgramList/index.vue'
import RaceTrack from './components/RaceTrack/index.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('generateHorses')
})
</script>

<style src="./style.css"></style>
