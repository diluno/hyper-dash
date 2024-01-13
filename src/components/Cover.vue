<script setup>
import HomeAssistant from '../helpers/homeassistant.js';
import { ref } from 'vue';
const homeassistant = new HomeAssistant();

const props = defineProps(['show']);

const coverUrl = ref('');
const hasCover = ref(false);
const coverBase = 'http://homeassistant.local:8123';
const entities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']

async function checkEntities() {
  hasCover.value = false;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    await homeassistant.getEntityState(entity).then(state => {
      if (state.state == 'playing' && state.attributes.entity_picture) {
        const coverUrlNew = coverBase + state.attributes.entity_picture
        hasCover.value = true;
        if (coverUrl.value === coverUrlNew) return;
        coverUrl.value = coverUrlNew;
      }
    });
    if (hasCover.value) break;
  }
  if (!hasCover.value) {
    coverUrl.value = '';
  }
}
checkEntities();

setInterval(() => {
  checkEntities();
}, 5000);

</script>

<template>
  <img class="cover"
       :class="{ hidden: !show || !coverUrl }"
       :src="coverUrl" />
</template>

<style lang="scss">
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 10;
  transition: transform .5s;

  &.hidden {
    transform: translateX(-100%);
  }
}
</style>
