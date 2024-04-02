<script setup>
import { entities } from "../store";
import { computed, ref, watch } from 'vue';

const temp = ref('');
const co2 = ref('');
const humidity = ref('');

watch(entities, (newEntities) => {
  checkEntities();
});

function checkEntities() {
  if (!entities.value) return;
  co2.value = entities.value['sensor.indoor_co2'].state;
  temp.value = entities.value['sensor.indoor_temperature'].state;
  humidity.value = entities.value['sensor.indoor_humidity'].state;
}

const co2Color = computed(() => {
  if (co2.value < 800) return '#00E400';
  if (co2.value < 1000) return '#FFFF00';
  if (co2.value < 1400) return '#FF7E00';
  return '#FF0000';
});

const tempEmoji = computed(() => {
  if (temp.value < 18) return '❄️';
  if (temp.value < 22) return '🌡️';
  if (temp.value < 25) return '🔥';
  return '🔥🔥🔥';
});

setInterval(() => {
  checkEntities();
}, 30000);
checkEntities();

</script>

<template>
  <div>
    <h2>Netatmo</h2>
    <div class="container"
         style="--bubble-color: #BCEEF8;">
      <div class="bubble bubble--large"><i class="co2"></i>{{ co2 }}<sup>ppm</sup></div>
      <div class="bubble bubble--large"><i>{{ tempEmoji }}</i>{{ temp }}<sup>°C</sup></div>
      <div class="bubble bubble--large"><i>💧</i>{{ humidity }}<sup>%</sup></div>
    </div>
  </div>
</template>

<style lang="scss">
.co2 {
  color: v-bind(co2Color);
  background: currentColor;
  width: 1rem;
  height: 1rem;
  border-radius: 99%;
  border: 1px solid rgba(#000, .3);
  transform: translate(.1rem, .1rem);
  filter: drop-shadow(0 0 5px currentColor);
}
</style>
