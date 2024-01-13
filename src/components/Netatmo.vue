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

const co2Color = computed(() => {
  if(co2.value < 800) return '#00E400';
  if(co2.value < 1000) return '#FFFF00';
  if(co2.value < 1400) return '#FF7E00';
  return '#FF0000';
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
    <div class="bubble bubble--large"><i class="co2"></i>{{ co2 }}<sup>ppm</sup></div>
    <div class="bubble bubble--large"><i>{{ tempEmoji }}</i>{{ temp }}<sup>°C</sup></div>
    <div class="bubble bubble--large"><i>💧</i>{{ humidity }}<sup>%</sup></div>
  </div>
</template>

<style lang="scss">
.co2 {
  background: v-bind(co2Color);
  width: 1rem;
  height: 1rem;
  border-radius: 99%;
}
</style>
