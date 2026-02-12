<template>
  <div @click="slideToggle" class="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      class="w-5 stroke-slate-950 dark:stroke-white"
    >
      <g clip-path="url(#clip0_4418_3746)">
        <path d="M3 7H21" stroke-width="1.5" stroke-linecap="round" />
        <path d="M9.49023 12H21.0002" stroke-width="1.5" stroke-linecap="round" />
        <path d="M3 12H5.99" stroke-width="1.5" stroke-linecap="round" />
        <path d="M3 17H21" stroke-width="1.5" stroke-linecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_4418_3746">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { asideOpenOrClose } from "@/assets/funcs";

const slideToggle = () => {
  asideOpenOrClose();
};
</script>

<style scoped></style>
