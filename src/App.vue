<script setup>
import { onMounted, ref } from "vue";
import Cover from "./components/Cover.vue";
import Time from "./components/Time.vue";

const main = ref(null);
const showCover = ref(true);
let clickTimeout = null;

onMounted(() => {
  main.value.addEventListener("click", () => {
    showCover.value = false;
    clickTimeout = setTimeout(() => {
      showCover.value = true;
    }, 2000);
  });
});

</script>

<template>
  <main ref="main">
    <Cover :show="showCover" />
    <div class="bubbles">
      <Time />
    </div>
  </main>
</template>

<style lang="scss"></style>
