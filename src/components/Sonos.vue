<script setup>
import HomeAssistant from '../helpers/homeassistant.js';
const homeassistant = new HomeAssistant();
import { ref } from 'vue';

const entities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']
const artist = ref('');
const title = ref('');
const isPlaying = ref(false);

async function checkEntities() {
  isPlaying.value = false;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    await homeassistant.getEntityState(entity).then(state => {
      if (state.state == 'playing') {
        console.log(state.attributes);
        isPlaying.value = true;
        artist.value = state.attributes.media_artist;
        title.value = state.attributes.media_title;
      }
    });
    if (isPlaying.value) break;
  }
  if (!isPlaying.value) {
    artist.value = '~ silence is golden ~';
    title.value = '';
  }
}
checkEntities();

setInterval(() => {
  checkEntities();
}, 2000);

</script>

<template>
  <div class="container"
       style="--bubble-color: #FBCDFF;">
    <div class="bubble"
         v-if="title">{{ title }}</div>
    <div class="bubble"
         v-if="artist">{{ artist }}</div>
  </div>
</template>

<style lang="scss">
</style>
