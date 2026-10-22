<template>
  <NuxtLink
    :href="media.meta.slug"
    class="group relative h-fit flex flex-col gap-2 rounded-lg hover:shdw p-2 sm:p-4 hover:bg-gray-700/40 transition-all duration-300"
  >
    <MediaBookmarkButton v-if="!hideBookmark" :media top-right />
    <MediaImgCont>
      <MediaImg :media class="group-hover:scale-105 transition-transform" />
    </MediaImgCont>

    <div class="flex flex-col items-start text-start gap-1">
      <h3
        class="w-full text-lg font-semibold leading-tight line-clamp-3 text-ellipsis break-words"
      >
        {{ media.meta.title }}
      </h3>
      <p
        class="w-full text-sm text-gray-400 leading-tight line-clamp-2 text-ellipsis break-words"
      >
        {{ media.meta.author }}
      </p>
      <p class="flex gap-1.5">
        <span class="text-xs text-gray-500 capitalize">
          {{ media.meta.type }}
        </span>
        <span class="text-xs text-gray-500 capitalize">●</span>
        <span class="text-xs text-gray-500">{{ media.meta.year }}</span>
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Media } from '~~/types'

const { media, hideBookmark = false } = defineProps<{
  media: Media
  hideBookmark?: boolean
}>()
</script>

<style scoped></style>
