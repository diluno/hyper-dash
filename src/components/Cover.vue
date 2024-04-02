<script setup>
import { watch, ref } from "vue";
import { entities } from "../store";

// const props = defineProps(['show']);

const show = ref(true);
const coverUrl = ref('');
const hasCover = ref(false);
const coverBase = 'http://homeassistant.local:8123';
const mediaEntities = ['media_player.living_room', 'media_player.bathroom', 'media_player.bedroom', 'media_player.kitchen']

watch(entities, (newEntities) => {
  checkEntities();
});

async function checkEntities() {
  if (!entities.value) return;
  hasCover.value = false;
  mediaEntities.forEach(slug => {
    const entity = entities.value[slug];
    if (!entity) return;
    if (entity.state == 'playing' && entity.attributes.entity_picture) {
      const coverUrlNew = coverBase + entity.attributes.entity_picture
      hasCover.value = true;
      if (coverUrl.value === coverUrlNew) return;
      coverUrl.value = coverUrlNew;
    }
    if (hasCover.value) return;
  });
  if (!hasCover.value) {
    coverUrl.value = '';
  }
}
checkEntities();

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
