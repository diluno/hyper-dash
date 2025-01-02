<script setup>
import { entities } from '../store';
import { computed, ref, watch } from 'vue';

const values = computed(() => {
  return {
    co2: entities.value ? entities.value['sensor.indoor_carbon_dioxide'].state : 0,
    temp: entities.value
      ? entities.value['sensor.indoor_temperature'].state
      : 0,
    humidity: entities.value
      ? entities.value['sensor.indoor_humidity'].state
      : 0,
    temp_outdoor: entities.value
      ? entities.value['sensor.indoor_outdoor_temperature'].state
      : 0,
  };
});

const co2Color = computed(() => {
  if (values.value.co2 < 900) return '#43C041';
  if (values.value.co2 < 1100) return '#FFB006';
  if (values.value.co2 < 1500) return '#EE5420';
  return '#FF0000';
});

const tempEmoji = computed(() => {
  if (values.value.temp < 19) return '❄️';
  if (values.value.temp < 23) return '🌡️';
  if (values.value.temp < 25) return '☀️';
  return '🔥';
});

const co2style = computed(() => {
  const _show = values.value.co2 > 900;
  return {
    color: co2Color.value,
    display: _show ? 'block' : 'none',
  };
});
</script>

<template>
  <div>
    <!-- <h2>Netatmo</h2> -->
    <div
    class="container"
    style="--bubble-color: #FFB006; --text-color: var(--c-bg)"
    v-if="values.co2 != 'unavailable'"
    >
      <div class="co2-bubble" :style="co2style">⚠</div>
      <div
        class="bubble bubble--large"
        :class="{ 'bubble--alarm': values.co2 > 1100 }"
      >
        <!-- <i class="co2"></i> -->
        <small>CO2</small>
        {{ values.co2 }}
        <sup>ppm</sup>
      </div>
      <div class="bubble bubble--large">
        <!-- <i>{{ tempEmoji }}</i> -->
        <small>Temperature Indoor</small>
        {{ values.temp }}
        <sup>°C</sup>
      </div>
      <div class="bubble bubble--large">
        <!-- <i>💧</i> -->
        <small>Humidity Indoor</small>
        {{ values.humidity }}
        <sup>%</sup>
      </div>
      <div class="bubble bubble--large">
        <!-- <i>🌳</i> -->
        <small>Temperature Outdoor</small>
        {{ values.temp_outdoor }}
        <sup>°C</sup>
      </div>
    </div>
    <div class="container" v-else>🙈</div>
  </div>
</template>

<style lang="scss">
.co2-bubble {
  color: red;
  border: 1px solid currentColor;
  text-align: center;
  line-height: 2.5rem;
  // height: 2em;
  width: 2.5rem;
  font-size: 1.25em;
}
.bubble .co2 {
  color: v-bind(co2Color);
  background: currentColor;
  width: 1em;
  height: 1em;
  border-radius: 99%;
  left: 0.25em;
  top: 50%;
  transform: translateY(-50%);
  // filter: blur(.1em);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 99%;
    background: currentColor;
    filter: blur(0.1em);
  }
}

.alarm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(red, 0.2);
  box-sizing: border-box;
  z-index: 10;
  box-shadow: 0 0 100px red inset;
  animation: pulseshadow 2s infinite ease-in-out alternate;
  pointer-events: none;
}

@keyframes pulseshadow {
  0% {
    box-shadow: 0 0 50px rgba(red, 0.2) inset;
  }

  100% {
    box-shadow: 0 0 130px rgba(red, 1) inset;
  }
}
</style>
