<template>
  <div class="cont -8 px-4">
    <div class="flex flex-col lg:flex-row items-start gap-8">
      <div
        class="w-64 aspect-[2/3] flex items-center justify-center rounded-lg shadow-lg overflow-hidden"
      >
        <NuxtImg
          :src="cover || '/cover_not_available.webp'"
          alt="Book cover"
          class="min-h-full group-hover:scale-105 transition-transform"
        />
      </div>

      <div class="flex-1 space-y-4">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p class="text-lg text-gray-400">By: {{ author }}</p>
        <p class="text-md text-gray-500">{{ year }}</p>
        <p class="text-md text-gray-500 capitalize">{{ type }}</p>
        <p class="text-sm text-gray-300 leading-relaxed">{{ description }}</p>

        <div class="flex gap-4 mt-6">
          <button
            class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all"
          >
            {{ t('book.addToLibrary') }}
            <Icon name="mdi:book-plus-outline" />
          </button>
          <button
            class="bg-neutral-300 hover:bg-stone-500 hover:text-white text-black py-2 px-4 rounded-lg transition-all"
          >
            {{ t('book.startReading') }}
            <Icon name="mdi:book-open-variant" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MediaMeta } from '~/types'
const { t } = useI18n()

const props = defineProps<{ meta: MediaMeta }>()
const { author, cover, title, type, year, description } = props.meta
</script>

<style scoped></style>
