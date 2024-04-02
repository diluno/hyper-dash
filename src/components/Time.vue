<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const time = ref('');
const date = ref('');
const day = ref('');

function check() {
  time.value = dayjs().format('HH:mm');
  date.value = dayjs().format('DD.MM.YYYY');
  day.value = dayjs().format('dddd');
}

setInterval(() => {
  check();
}, 5000);
check();

</script>

<template>
  <div class="container"
       style="--bubble-color: #FFCA34;">
    <div class="bubble bubble--large">{{ time }}</div>
    <div class="bubble bubble--large">{{ date }}</div>
    <!-- <div class="bubble bubble--large">{{ day }}</div> -->
  </div>
</template>

<style lang="scss"></style>
