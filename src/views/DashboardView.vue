<template>
  <div>
    <div class="text-invite">Dashboard View</div>

    <p class="text-invite">
      {{ t("language") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
