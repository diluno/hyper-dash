<script setup>
import feather from 'feather-icons';
import { entities } from '../store';
import { computed, watch } from 'vue';

const emit = defineEmits(['sendMessage']);
const mediaEntities = [
  'media_player.living_room_2',
  'media_player.bathroom',
  'media_player.bedroom',
  'media_player.kitchen',
];
const coverBase = 'http://homeassistant.local:8123';
// const coverBase = 'https://hassio.dil.uno';

watch(
  entities,
  () => {
    feather.replace();
  },
  { immediate: true }
);

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
      t.cover = entity.attributes.entity_picture;
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
      entity_id: 'media_player.kitchen',
    },
  });
}
function stopMedia() {
  emit('sendMessage', {
    type: 'call_service',
    domain: 'media_player',
    service: 'media_stop',
    service_data: {
      entity_id: 'media_player.kitchen',
    },
  });
}
</script>

<template>
  <div class="bubbles-component" v-if="track && track.playing">
    <!-- <h2>Sonos</h2> -->
    <div class="container">
      <!-- <div class="sonos-cover" v-if="track.cover">
        <img :src="coverBase + track.cover" alt="" />
      </div> -->
      <div class="bubble" v-if="track.artist">
        <small>Artist</small>
        {{ track.artist }}
      </div>
      <div class="bubble" v-if="track.title">
        <small>Song</small>
        {{ track.title }}
      </div>
      <!-- <div class="bubble bubble--interactive" @click="nextTrack">
        <i data-feather="skip-forward"></i>
      </div>
      <div class="bubble bubble--interactive" @click="stopMedia">■</div> -->
    </div>
  </div>
</template>

<style lang="scss">
.sonos-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
}
</style>
