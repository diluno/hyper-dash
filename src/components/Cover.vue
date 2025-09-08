<script setup>
import { watch, ref, computed } from "vue";
import { entities } from "../store";

const show = ref(true);
const coverBase = "http://homeassistant.local:8123";
const mediaEntities = [
  "media_player.living_room",
  "media_player.bathroom",
  "media_player.bedroom",
  "media_player.kitchen",
  "media_player.living_room_atv_2",
];

let timeout = null;

const coverUrl = computed(() => {
  if (!entities.value) return;
  let url = null;
  for (let i = 0; i < mediaEntities.length; i++) {
    const slug = mediaEntities[i];
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == "playing" && entity.attributes.entity_picture) {
      url = coverBase + entity.attributes.entity_picture;
      break;
    }
  }
  return url;
});

const track = computed(() => {
  const t = { artist: "", title: "", playing: false };
  if (!entities.value) return t;
  for (let i = 0; i < mediaEntities.length; i++) {
    const slug = mediaEntities[i];
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == "playing") {
      t.playing = true;
      t.artist = entity.attributes.media_artist;
      t.title = entity.attributes.media_title;
      break;
    }
  }
  return t;
});

watch(show, (newShow) => {
  if (newShow) {
    clearTimeout(timeout);
    return;
  }
  timeout = setTimeout(() => {
    show.value = true;
  }, 10000);
});

watch(coverUrl, (newUrl) => {
  if (newUrl) {
    document.body.classList.add("has-cover");
  } else {
    document.body.classList.remove("has-cover");
  }
});
</script>

<template>
  <div
    class="cover"
    @click="show = !show"
    :class="{ hidden: !show }"
    v-if="coverUrl"
  >
    <!-- <div class="cover__track">
      <span v-if="track.artist"
            class="cover__track__artist">{{ track.artist }}</span>
      <span class="cover__track__title">{{ track.title }}</span>
    </div> -->
    <img
      class="cover__img"
      ref="cover"
      crossorigin="anonymous"
      :src="coverUrl"
    />
    <img class="cover__img" :src="coverUrl" />
  </div>
</template>

<style lang="scss">
.cover {
  --ease: cubic-bezier(0.075, 0.82, 0.165, 1);

  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  transform-origin: 100% 0;
  transition: transform 0.5s var(--ease), border-radius 0.5s var(--ease),
    top 0.5s var(--ease), right 0.5s var(--ease);

  &__track {
    display: flex;
    display: none;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 2;
    gap: 2px;
    flex-direction: column;
    align-items: flex-start;

    &__artist,
    &__title {
      display: block;
      font-size: 1rem;
      border-radius: 0.4em;
      color: rgba(#fff, 1);
      background-color: rgba(#000, 0.4);
      backdrop-filter: blur(5px);
      padding: 0.2em 0.5rem;
      // font-weight: 600;
    }

    &__artist {
      font-weight: 400;
      font-size: 0.8rem;
    }
  }

  &.hidden {
    top: 0.5rem;
    right: 0.5rem;
    transform: scale(0.15);

    .cover__track {
      display: none;
    }

    .cover__img {
      border-radius: 2rem;

      &:nth-child(2) {
        filter: blur(2rem);
        opacity: 0.8;
      }
    }
  }

  &__img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    // filter: blur(30px);
    // transform: scale(1.2);
    opacity: 0.3;
    transition: filter 0.5s var(--ease), border-radius 0.5s var(--ease);
  }
}

// .dark .cover__img {
//   opacity: .1;
// }
</style>
