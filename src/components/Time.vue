<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const time = ref('');
const date = ref('');
const day = ref('');

setInterval(() => {
  time.value = dayjs().format('HH:mm');
  date.value = dayjs().format('DD.MM.YYYY');
  day.value = dayjs().format('dddd');
}, 5000);

</script>

<template>
  <div class="container"
       style="--bubble-color: #FFCA34;">
    <div class="bubble">{{ time }}</div>
    <div class="bubble">{{ date }}</div>
    <div class="bubble">{{ day }}</div>
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
