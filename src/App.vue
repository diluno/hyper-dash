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

function reload() {
  location.reload();
}

</script>

<template>
  <main>
    <Cover />
    <a href="#"
       @click="reload"
       class="reload-btn"></a>
    <div class="bubbles">
      <Time />
      <Netatmo />
      <Plex />
      <!-- <Sonos /> -->
    </div>
  </main>
</template>

<style lang="scss">
.reload-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: block;
  background: transparent;
}
</style>
