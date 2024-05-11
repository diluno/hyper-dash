<script setup>
import { entities } from "../store";
import { computed, ref, watch } from 'vue';

const values = computed(() => {
  return {
    co2: entities.value ? entities.value['sensor.indoor_co2'].state : 0,
    temp: entities.value ? entities.value['sensor.indoor_temperature'].state : 0,
    humidity: entities.value ? entities.value['sensor.indoor_humidity'].state : 0
  };
});

const co2Color = computed(() => {
  if (values.value.co2 < 800) return '#00E400';
  if (values.value.co2 < 1000) return '#FFFF00';
  if (values.value.co2 < 1400) return '#FF7E00';
  return '#FF0000';
});

const tempEmoji = computed(() => {
  if (values.value.temp < 19) return '❄️';
  if (values.value.temp < 22.5) return '🌡️';
  if (values.value.temp < 25) return '🔥';
  return '🥵';
});

</script>

<template>
  <div>
    <h2>Netatmo</h2>
    <div class="alarm" v-if="values.co2 > 1100"></div>
    <div class="container"
         style="--bubble-color: #BCEEF8;"
         v-if="values.co2 != 'unavailable'">
      <div class="bubble bubble--large"><i class="co2"></i>{{ values.co2 }}<sup>ppm</sup></div>
      <div class="bubble bubble--large"><i>{{ tempEmoji }}</i>{{ values.temp }}<sup>°C</sup></div>
      <div class="bubble bubble--large"><i>💧</i>{{ values.humidity }}<sup>%</sup></div>
    </div>
    <div class="container"
         v-else>
      🙈
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

.alarm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(red, .2);
  box-sizing: border-box;
  z-index: 10;
  box-shadow: 0 0 100px red inset;
  animation: pulseshadow 2s infinite ease-in-out alternate;
  pointer-events: none;
}

@keyframes pulseshadow {
  0% {
    box-shadow: 0 0 50px rgba(red, .2) inset;
  }
  100% {
    box-shadow: 0 0 130px rgba(red, 1) inset;
  }
}
</style>
