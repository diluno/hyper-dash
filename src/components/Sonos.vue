<script setup>
import { entities } from "../store";
import { ref, watch } from 'vue';

const mediaEntities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']
const artist = ref('');
const title = ref('');
const isPlaying = ref(false);

watch(entities, (newEntities) => {
  checkEntities();
});

function checkEntities() {
  if (!entities.value) return;
  isPlaying.value = false;
  mediaEntities.forEach(slug => {
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == 'playing') {
      isPlaying.value = true;
      artist.value = entity.attributes.media_artist;
      title.value = entity.attributes.media_title;
    }
  });
  if (isPlaying.value) return;
}

if (!isPlaying.value) {
  artist.value = '';
  title.value = '';
}

checkEntities();

setInterval(() => {
  checkEntities();
}, 2000);

</script>

<template>
  <div v-if="isPlaying">
    <h2>Sonos</h2>
    <div class="container"
         style="--bubble-color: #FBCDFF;">
      <div class="bubble"
           v-if="title">{{ title }}</div>
      <div class="bubble"
           v-if="artist">{{ artist }}</div>
    </div>
  </div>
</template>

<style lang="scss"></style>
