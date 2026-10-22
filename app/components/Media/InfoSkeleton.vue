<template>
  <div class="cont px-4">
    <div class="flex flex-col lg:flex-row items-start gap-8">
      <div class="w-64 aspect-[3/5.53] skeleton-upper" />

      <div class="flex-1 space-y-4">
        <div class="w-4/5 h-14 skeleton-upper" />
        <div class="w-3/5 h-10 skeleton-upper" />
        <div class="w-1/5 h-8 skeleton-upper" />
        <div class="w-1/5 h-8 skeleton-upper" />

        <div class="flex gap-4 mt-6">
          <div class="w-48 h-10 skeleton-upper" />
          <div class="w-48 h-10 skeleton-upper" />
        </div>

        <div class="w-full h-48 skeleton-upper" />
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
