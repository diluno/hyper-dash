<script setup>
import { onMounted, ref } from "vue";
import {
  subscribeEntities,
} from 'home-assistant-js-websocket';
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
let conn = null;

onMounted(async () => {
  conn = await homeassistant.connectSocket();
  subscribeEntities(conn, (ent) => {
    entities.value = ent;
  });
});

new DarkMode();

function reload() {
  location.reload();
}

function toggleDarkmode() {
  document.body.classList.toggle('dark');
}

function sendMessage(_msg) {
  conn.sendMessagePromise(_msg);
}

</script>

<template>
  <Suspense>
    <main>
      <!-- <Cover /> -->
      <a href="#"
         @click="reload"
         class="reload-btn"></a>
      <a href="#"
         @click="toggleDarkmode"
         class="dark-btn"></a>
      <div class="bubbles">
        <Time />
        <Netatmo />
        <Sonos @sendMessage="sendMessage" />
        <Plex />
      </div>
    </main>
  </Suspense>
</template>

<style lang="scss">
.reload-btn, .dark-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: block;
  background: transparent;
}
.dark-btn {
  right: auto;
  left: 0;
}
</style>
