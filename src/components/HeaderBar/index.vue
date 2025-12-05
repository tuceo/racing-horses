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
defineOptions({
  name: 'HeaderBar',
})

import { useStore } from '../../store'

const store = useStore()

const generateSchedule = () => store.dispatch('generateProgram')
</script>

<style src="./style.css" scoped></style>
