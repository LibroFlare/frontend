<template>
  <button @click.prevent="toggle">
    <Icon
      :name="isMarked ? 'zondicons:bookmark' : 'zondicons:bookmark-outline-add'"
      class="text-2xl transition-colors"
      :class="
        isMarked ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
      "
    />
  </button>
</template>

<script lang="ts" setup>
import type { MediaMeta } from '~/types'

const { meta } = defineProps<{ meta: MediaMeta }>()
const emits = defineEmits<{ isBookmarked: [boolean] }>()

const { isBookmarked, toggleBookmark } = useLibraryStore()

const isMarked = computed(() => isBookmarked(meta.id))
watchEffect(() => emits('isBookmarked', isMarked.value))

const toggle = () => toggleBookmark(meta)
</script>

<style lang="scss"></style>
