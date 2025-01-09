<template>
  <div>
    <HeroBar />
    <NavBar />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import HeroBar from "@/components/HeroBar.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped></style>
