<script setup>
import { watch, ref, computed } from "vue";
import { entities } from "../store";

const show = ref(true);
const coverBase = 'http://homeassistant.local:8123';
const mediaEntities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']

const coverUrl = computed(() => {
  if (!entities.value) return;
  let url = null;
  mediaEntities.forEach(slug => {
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == 'playing' && entity.attributes.entity_picture) {
      url = coverBase + entity.attributes.entity_picture;
    }
  });
  return url;
});

watch(show, (newShow) => {
  if (newShow) return;
  setTimeout(() => {
    show.value = true;
  }, 10000);
});

</script>

<template>
  <div class="cover"
       @click="show = !show"
       :class="{ hidden: !show }"
       v-if="coverUrl">
    <img class="cover__img"
         :src="coverUrl" />
    <img class="cover__img"
         :src="coverUrl" />
  </div>
</template>

<style lang="scss">
.cover {
  --ease: cubic-bezier(0.075, 0.820, 0.165, 1.000);

  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform-origin: 100% 0;
  transition: transform .5s var(--ease), border-radius .5s var(--ease), top .5s var(--ease), right .5s var(--ease);

  &.hidden {
    top: .5rem;
    right: .5rem;
    transform: scale(.15);

    .cover__img {
      border-radius: 2rem;

      &:nth-child(1) {
        filter: blur(3rem);
        opacity: .8;
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
    transition: filter .5s var(--ease), border-radius .5s var(--ease);
  }
}
</style>
