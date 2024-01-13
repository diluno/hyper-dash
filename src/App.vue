<script setup>
import { onMounted, ref } from "vue";
import Cover from "./components/Cover.vue";
import Time from "./components/Time.vue";
import Netatmo from "./components/Netatmo.vue";
import Sonos from "./components/Sonos.vue";

const showCover = ref(true);
const clickTimeout = ref(null);

onMounted(() => {
  document.addEventListener("click", () => {
    showCover.value = false;
    clearTimeout(clickTimeout.value);
    clickTimeout.value = setTimeout(() => {
      showCover.value = true;
    }, 2000);
  });
});

</script>

<template>
  <main>
    <!-- <Cover :show="showCover" /> -->
    <div class="bubbles">
      <Time />
      <h2>Netatmo</h2>
      <Netatmo />
      <h2>Sonos</h2>
      <Sonos />
    </div>
  </main>
</template>

<style lang="scss"></style>
