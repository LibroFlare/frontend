<template>
  <div
    class="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
  >
    <NuxtLink class="flex items-center gap-4">
      <NuxtImg
        :src="cover"
        alt="Book cover"
        class="w-16 h-24 object-cover rounded-md"
      />
      <div class="flex flex-col">
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
        <p class="text-sm text-gray-400">{{ author }}</p>
        <p class="text-xs text-gray-500">{{ year }}</p>
        <p class="text-xs text-gray-500 capitalize">{{ type }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { MediaMeta } from '~/types'

const props = defineProps<{ meta: MediaMeta }>()
const { author, cover, title, type, year } = props.meta
</script>

<style scoped></style>
