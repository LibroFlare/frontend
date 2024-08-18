<template>
  <div class="flex flex-col gap-2 rounded-lg p-4 bg-gray-700/15 animate-pulse">
    <div class="w-full aspect-[3/4] skeleton-upper" />
    <div class="flex flex-col gap-1">
      <div class="w-full h-6 skeleton-upper" />
      <div class="w-full h-5 skeleton-upper" />
      <div class="flex items-center gap-1.5">
        <div class="w-12 h-4 skeleton-upper" />
        <div class="size-3 skeleton-upper" />
        <div class="w-12 h-4 skeleton-upper" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton-upper {
  @apply animate-pulse bg-gray-700/40 rounded-lg text-transparent;
}
</style>
