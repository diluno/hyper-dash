<script setup>
import feather from "feather-icons";
import { entities } from "../store";
import { computed, watch, ref } from "vue";

const emit = defineEmits(["sendMessage"]);
const mediaEntities = [
  "media_player.living_room_2",
  "media_player.bathroom",
  "media_player.bedroom",
  "media_player.kitchen",
  "media_player.living_room_atv_2",
];
const activeEntity = ref("media_player.living_room_2");
// const coverBase = "http://homeassistant.local:8123";
const coverBase = 'https://hassio.dil.uno';

watch(
  entities,
  () => {
    feather.replace();
  },
  { immediate: true }
);

const track = computed(() => {
  const t = { artist: "", title: "", playing: false };
  if (!entities.value) return t;
  for (let i = 0; i < mediaEntities.length; i++) {
    const slug = mediaEntities[i];
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == "playing") {
      activeEntity.value = slug;
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
  emit("sendMessage", {
    type: "call_service",
    domain: "media_player",
    service: "media_next_track",
    service_data: {
      entity_id: activeEntity.value,
    },
  });
}
function stopMedia() {
  emit("sendMessage", {
    type: "call_service",
    domain: "media_player",
    service: "media_stop",
    service_data: {
      entity_id: activeEntity.value,
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
      <div class="bubble bubble--interactive" @click="nextTrack">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 92C24 100.099 30.5677 106.667 38.6666 106.667C41.7344 106.672 44.724 105.714 47.2136 103.922L81.3336 79.5618C85.5003 76.5878 87.9743 71.7858 87.9743 66.666C87.9743 61.5461 85.5003 56.7441 81.3336 53.7701L47.2549 29.4008C42.7809 26.1716 36.8747 25.7237 31.9682 28.2393C27.062 30.7601 23.9838 35.8174 23.9994 41.333L24 92ZM34.6666 41.3333C34.6666 39.125 36.4584 37.3333 38.6666 37.3333C39.5052 37.3333 40.3281 37.5937 41.0156 38.0781L75.1609 62.4528C76.5203 63.4215 77.3328 64.9944 77.3328 66.6664C77.3328 68.3384 76.5203 69.9112 75.1609 70.88L41.0516 95.2546C40.3537 95.7442 39.5204 96.0046 38.6661 95.9994C36.4578 95.9994 34.6661 94.2077 34.6661 91.9994L34.6666 41.3333Z"
            fill="#fff"
          />
          <path
            d="M109.333 101.333V31.9998C109.333 29.052 106.948 26.6665 104 26.6665C101.052 26.6665 98.6666 29.052 98.6666 31.9998V101.333C98.6666 104.281 101.052 106.667 104 106.667C106.948 106.667 109.333 104.281 109.333 101.333Z"
            fill="#fff"
          />
        </svg>
      </div>
      <div class="bubble bubble--interactive" @click="stopMedia">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45.3333 101.333H88C91.5364 101.333 94.9271 99.9271 97.4271 97.4271C99.9271 94.9271 101.333 91.5364 101.333 88V45.3333C101.333 41.7969 99.9271 38.4063 97.4271 35.9063C94.9271 33.4063 91.5364 32 88 32H45.3333C37.9688 32 32 37.9688 32 45.3333V88C32 91.5364 33.4063 94.9271 35.9063 97.4271C38.4063 99.9271 41.7969 101.333 45.3333 101.333ZM42.6667 45.3333C42.6667 43.8593 43.8594 42.6667 45.3333 42.6667H88C88.7083 42.6667 89.3855 42.9479 89.8855 43.4479C90.3855 43.9479 90.6667 44.625 90.6667 45.3334V88.0001C90.6667 88.7084 90.3855 89.3855 89.8855 89.8855C89.3855 90.3855 88.7084 90.6668 88 90.6668H45.3333C43.8593 90.6668 42.6667 89.4741 42.6667 88.0001V45.3333Z"
            fill="#fff"
          />
        </svg>
      </div>
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
