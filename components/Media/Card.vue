<template>
  <NuxtLink
    :href="slug"
    class="relative h-fit flex flex-col gap-2 bg-gray-800 rounded-lg shadow-lg p-2 hover:bg-gray-700 transition-all duration-300"
  >
    <div
      class="absolute top-2 right-2 cursor-pointer"
      @click.stop="toggleFavorite"
    >
      <Icon
        :name="
          isFavorite ? 'zondicons:bookmark' : 'zondicons:bookmark-outline-add'
        "
        class="text-2xl"
        :class="
          isFavorite
            ? 'text-yellow-400'
            : 'text-gray-400 hover:text-yellow-400 transition-all duration-200'
        "
      />
    </div>

    <div
      class="w-full flex items-center justify-center aspect-[2/3] rounded-md overflow-hidden"
    >
      <NuxtImg :src="cover" alt="Book cover" class="w-full" />
    </div>

    <div class="flex flex-col items-start text-start gap-1">
      <b
        class="text-lg font-semibold text-white leading-tight line-clamp-3 text-ellipsis break-words"
      >
        {{ title }}
      </b>
      <p class="text-sm text-gray-400">{{ author }}</p>
      <p class="flex gap-1.5">
        <span class="text-xs text-gray-500 capitalize">{{ type }}</span>
        <span class="text-xs text-gray-500 capitalize">●</span>
        <span class="text-xs text-gray-500">{{ year }}</span>
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'
import type { MediaMeta } from '~/types'

const props = defineProps<{ meta: MediaMeta }>()
const { slug, author, cover, title, type, year } = props.meta

const favoritesStore = useFavoritesStore()
const isFavorite = computed(() => favoritesStore.isFavorite(props.meta.id))
const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.meta)
}
</script>

<style scoped></style>
