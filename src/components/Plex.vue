<script setup>
import { entities } from '../store';
import { computed, ref, watch } from 'vue';

const truncateLength = 30;

const recentMovie = computed(() => {
  if (!entities.value) return null;
  let _item =
    entities.value['sensor.servelat_library_movies'].attributes.last_added_item;
  if (_item.length > truncateLength) {
    return _item.substring(0, truncateLength) + '...';
  }
  return _item;
});
const recentShow = computed(() => {
  if (!entities.value) return null;
  let _item =
    entities.value['sensor.servelat_library_tv_shows'].attributes
      .last_added_item;
  if (_item.length > truncateLength) {
    return _item.substring(0, truncateLength) + '...';
  }
  return _item;
});
</script>

<template>
  <div v-if="recentMovie">
    <!-- <h2>Plex</h2> -->
    <div
      class="container"
      style="--bubble-color: #66558C; --text-color: var(--c-bg)"
    >
      <div class="bubble">
        <small>Recent Movie</small>
        {{ recentMovie }}
      </div>
      <div class="bubble">
        <small>Recent Show</small>
        {{ recentShow }}
      </div>
    </div>
  </div>
</template>
