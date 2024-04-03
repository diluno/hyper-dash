<script setup>
import { entities } from "../store";
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';

const nextDeparture = computed(() => {
  if (!entities.value) return null;
  return dayjs(entities.value['sensor.zurich_binz_zurich_hb_szu_departure'].attributes.next_departure).format('HH:mm');
});
const nextOnDeparture = computed(() => {
  if (!entities.value) return null;
  return dayjs(entities.value['sensor.zurich_binz_zurich_hb_szu_departure'].attributes.next_on_departure).format('HH:mm');
});

</script>

<template>
  <div v-if="nextDeparture">
    <h2>Binz -> ZH HB</h2>
    <div class="container"
         style="--bubble-color: #FBC2C2;">
      <div class="bubble bubble--large"><i>🚃</i>{{ nextDeparture }}</div>
      <!-- <div class="bubble bubble--large"><i>🚃</i>{{ nextOnDeparture }}</div> -->
    </div>
  </div>
</template>
