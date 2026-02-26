<template>
  <header>
    <div class="text-invite font-semibold grow">App Header</div>
    <div class="flex gap-2">
      <AppLanguageToggle />
      <AppThemeToggle />
      <AppToggleSlider />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppToggleSlider from "../slider/AppToggleSlider.vue";
import AppThemeToggle from "./AppThemeToggle.vue";
import AppLanguageToggle from "./AppLanguageToggle.vue";
</script>

<style scoped></style>
