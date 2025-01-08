<template>
  <div>
    <HeroBar />
    <main class="p-4">
      <slot />
    </main>
    <
  </div>
</template>

<script lang="ts" setup>
import HeroBar from "@/components/HeroBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped></style>
