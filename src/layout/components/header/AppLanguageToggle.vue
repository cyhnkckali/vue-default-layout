<template>
  <div class="language-toggle">
    <button
      v-for="locale in SUPPORT_LOCALES"
      :key="locale"
      :class="['language-btn', { 'language-btn--active': currentLocale === locale }]"
      @click="changeLanguage(locale)"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { SUPPORT_LOCALES } from "@/localization";

const router = useRouter();
const route = useRoute();

const currentLocale = computed(() => route.params.locale as string);

const changeLanguage = (locale: string) => {
  // localStorage'a dili kaydet
  localStorage.setItem("app-locale", locale);

  // Router guard'ı dil dosyasını yüklemeyi sağla
  router.replace({
    params: {
      locale: locale,
    },
    query: route.query,
  });
  // window.location.reload();
};
</script>

<style scoped>
.language-toggle {
  display: flex;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background-color: hsl(var(--color-border) / 0.1);
  padding: 0.25rem;
}

.language-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.language-btn:hover {
  background-color: hsl(var(--color-border) / 0.2);
}

.language-btn--active {
  background-color: hsl(var(--color-border) / 0.5);
  color: var(--color-text);
}

.language-btn--active:hover {
  background-color: hsl(var(--color-border) / 0.6);
}
</style>
