<script setup>
import { entities } from "../store";
import { computed } from 'vue';

const emit = defineEmits(['sendMessage'])
const mediaEntities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']

const track = computed(() => {
  const t = { artist: '', title: '', playing: false };
  if (!entities.value) return t;
  for (let i = 0; i < mediaEntities.length; i++) {
    const slug = mediaEntities[i];
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == 'playing') {
      t.playing = true;
      t.artist = entity.attributes.media_artist;
      t.title = entity.attributes.media_title;
      break;
    }
  }
  return t;
});

function nextTrack() {
  emit('sendMessage', {
    type: 'call_service',
    domain: 'media_player',
    service: 'media_next_track',
    service_data: {
      entity_id: 'media_player.kitchen'
    }
  });
}

</script>

<template>
  <div v-if="track.playing">
    <h2>Sonos</h2>
    <div class="container"
         style="--bubble-color: #FBCDFF;">
      <div class="bubble bubble--interactive"
           @click="nextTrack">⇥</div>
      <div class="bubble"
           v-if="track.title">{{ track.title }}</div>
      <div class="bubble"
           v-if="track.artist">{{ track.artist }}</div>
    </div>
  </div>
</template>

<style lang="scss"></style>
