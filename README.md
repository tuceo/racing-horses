# 🐎 Vue.js Horse Racing Simulator

A real-time Horse Racing Simulator built with **Vue 3**, **TypeScript**, and **Vite**. This application generates random schedules, simulates races with a physics-based algorithm, and tracks results dynamically using a centralized **Vuex** store.

## 🚀 Features

* **Randomized Generation:** Creates 20 unique horses with random names, colors, and condition scores (1-100).
* **Program Generator:** Automatically builds a 6-round schedule with varying distances (1200m to 2200m).
* **Physics Engine:** Custom `requestAnimationFrame` loop that calculates speed based on a "Condition vs. Luck" algorithm.
* **Real-time Visualization:** Smooth 60FPS animation of horses moving across the track.
* **Automatic Progression:** Races run sequentially with a "TV-style" pause and auto-start between rounds.
* **Unit Testing:** Comprehensive test suite using **Vitest** covering Business Logic (Store) and UI Components.

## 🛠️ Tech Stack

* **Framework:** Vue.js 3 (Composition API + `<script setup>`)
* **Language:** TypeScript
* **State Management:** Vuex 4
* **Build Tool:** Vite
* **Testing:** Vitest & Vue Test Utils
* **Styles:** CSS3 (BEM naming convention)

## 📂 Project Structure

```text
src/
├── components/          # UI Components
│   ├── HeaderBar/       # Controls (Generate / Start / Pause)
│   ├── HorseList/       # Left Sidebar (Horse Stats)
│   ├── RaceSchedule/    # Right Sidebar (Program & Results)
│   ├── RaceTrack/       # Main Animation Area
│   └── RunningHorseIcon # SVG Icon Component
├── store/               # Vuex Store (State, Actions, Mutations)
├── utils/               # Constants and Type Definitions
└── App.vue              # Main Layout
