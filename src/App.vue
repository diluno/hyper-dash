<script setup>
import { onMounted, ref } from "vue";
import { entities } from "./store.js";
import HomeAssistant from "./helpers/homeassistant.js";
import DarkMode from './helpers/darkmode.js';
import Cover from "./components/Cover.vue";
import Time from "./components/Time.vue";
import Netatmo from "./components/Netatmo.vue";
import Plex from "./components/Plex.vue";
import Transport from "./components/Transport.vue";
import Sonos from "./components/Sonos.vue";

const homeassistant = new HomeAssistant();

homeassistant.connectSocket((ent) => {
  console.log(ent);
  entities.value = ent;
});

new DarkMode();

</script>

<template>
  <main>
    <Cover />
    <div class="bubbles">
      <Time />
      <Netatmo />
      <Transport />
      <Plex />
      <!-- <Sonos /> -->
    </div>
  </main>
</template>

<style lang="scss"></style>
