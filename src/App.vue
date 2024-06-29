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
      <div class="bubbles">
        <Time />
        <Netatmo />
        <Plex />
        <Sonos @sendMessage="sendMessage" />
      </div>
    </main>
  </Suspense>
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
