<template>
  <button
    class="shdw group/bookmark flex items-center justify-center p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-800 shadow-lg transition-colors"
    @click.prevent="toggle"
  >
    <Icon
      :name="isMarked ? 'zondicons:bookmark' : 'zondicons:bookmark-outline-add'"
      class="size-6 transition-colors"
      :class="
        isMarked
          ? 'text-yellow-400'
          : 'text-gray-400 group-hover/bookmark:text-yellow-400'
      "
    />
  </button>
</template>

<script lang="ts" setup>
import type { Media } from '~/types'

const { media } = defineProps<{ media: Media }>()
const emits = defineEmits<{ isBookmarked: [boolean] }>()

const { isBookmarked, toggleBookmark } = useLibraryStore()

const isMarked = computed(() => isBookmarked(media.key))
watchEffect(() => emits('isBookmarked', isMarked.value))

const toggle = () => toggleBookmark(media)
</script>

<style lang="scss"></style>
