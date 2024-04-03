<script setup>
import { entities } from "../store";
import { computed, ref, watch } from 'vue';

const recentMovie = computed(() => {
  if (!entities.value) return null;
  return entities.value['sensor.servelat_library_movies'].attributes.last_added_item;
});
const recentShow = computed(() => {
  if (!entities.value) return null;
  return entities.value['sensor.servelat_library_tv_shows'].attributes.last_added_item;
});

</script>

<template>
  <div v-if="recentMovie">
    <h2>Plex</h2>
    <div class="container"
         style="--bubble-color: #B3F5BB;">
      <div class="bubble"><i>🎬</i>{{ recentMovie }}</div>
      <div class="bubble"><i>📺</i>{{ recentShow }}</div>
      <!-- <div class="bubble bubble--large"><i>🚃</i>{{ nextOnDeparture }}</div> -->
    </div>
  </div>
</template>
