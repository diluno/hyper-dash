<script setup>
import { onMounted, ref } from "vue";
import { entities } from "./store.js";
import HomeAssistant from "./helpers/homeassistant.js";
import DarkMode from './helpers/darkmode.js';
import Cover from "./components/Cover.vue";
import Time from "./components/Time.vue";
import Netatmo from "./components/Netatmo.vue";
import Sonos from "./components/Sonos.vue";

const homeassistant = new HomeAssistant();

const showCover = ref(true);
const clickTimeout = ref(null);
// const entities = ref(null);

homeassistant.connectSocket((ent) => {
  entities.value = ent;
});

onMounted(() => {
  document.addEventListener("click", () => {
    showCover.value = false;
    clearTimeout(clickTimeout.value);
    clickTimeout.value = setTimeout(() => {
      showCover.value = true;
    }, 5000);
  });
});

const darkMode = new DarkMode();
darkMode.check();

setInterval(() => {
  darkMode.check();
}, 60000);

</script>

<template>
  <main>
    <Cover :show="showCover" />
    <div class="bubbles">
      <Time />
      <Netatmo />
      <Sonos />
    </div>
  </main>
</template>

<style lang="scss"></style>
