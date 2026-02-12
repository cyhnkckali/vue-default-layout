<template>
  <div class="default-layout overflow-hidden">
    <AppSlider />
    <div class="first-area">
      <AppHeader />
      <div class="second-area">
        <RouterView> </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/layout/components/header/AppHeader.vue";
import AppSlider from "@/layout/components/slider/AppSlider.vue";
</script>

<style scoped></style>
