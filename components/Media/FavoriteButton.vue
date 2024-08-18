<template>
  <button @click.prevent="toggle">
    <Icon
      :name="isFav ? 'zondicons:bookmark' : 'zondicons:bookmark-outline-add'"
      class="text-2xl transition-colors"
      :class="isFav ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'"
    />
  </button>
</template>

<script lang="ts" setup>
import type { MediaMeta } from '~/types'

const { meta } = defineProps<{ meta: MediaMeta }>()
const emits = defineEmits<{ isFavorite: [boolean] }>()

const { isFavorite, toggleFavorite } = useLibraryStore()

const isFav = computed(() => isFavorite(meta.id))
watchEffect(() => emits('isFavorite', isFav.value))

const toggle = () => toggleFavorite(meta)
</script>

<style lang="scss"></style>
