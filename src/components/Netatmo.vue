<script setup>
import HomeAssistant from '../helpers/homeassistant.js';
const homeassistant = new HomeAssistant();
import { computed, ref } from 'vue';

const temp = ref('');
const co2 = ref('');
const humidity = ref('');

function checkEntities() {
  homeassistant.getEntityState('sensor.indoor_co2').then(state => {
    co2.value = state.state;
  });
  homeassistant.getEntityState('sensor.indoor_temperature').then(state => {
    temp.value = state.state;
  });
  homeassistant.getEntityState('sensor.indoor_humidity').then(state => {
    humidity.value = state.state;
  });
}

const co2Emoji = computed(() => {
  if (co2.value < 800) return '🟢';
  if (co2.value < 1000) return '🟡';
  if (co2.value < 1400) return '🟠';
  if (co2.value < 2000) return '🔴';
  return '🚨';
});

const tempEmoji = computed(() => {
  if (temp.value < 18) return '🥶';
  if (temp.value < 22) return '😊';
  if (temp.value < 26) return '🥵';
  return '🥵🥵🥵';
});

setInterval(() => {
  checkEntities();
}, 30000);
checkEntities();

</script>

<template>
  <div class="container"
       style="--bubble-color: #BCEEF8;">
    <div class="bubble bubble--large"><i>{{ co2Emoji }}</i>{{ co2 }}<sup>ppm</sup></div>
    <div class="bubble bubble--large"><i>{{ tempEmoji }}</i>{{ temp }}<sup>°C</sup></div>
    <div class="bubble bubble--large"><i>💧</i>{{ humidity }}<sup>%</sup></div>
  </div>
</template>

<style lang="scss">
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
