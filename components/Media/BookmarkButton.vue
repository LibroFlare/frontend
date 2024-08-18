<template>
  <div class="group">
    <button
      class="group/bookmark flex items-center justify-center p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-800 shadow-lg transition-colors"
      @click.prevent="toggle"
    >
      <Icon
        :name="
          isMarked ? 'zondicons:bookmark' : 'zondicons:bookmark-outline-add'
        "
        class="size-6 transition-colors"
        :class="
          isMarked
            ? 'text-yellow-400'
            : 'text-gray-400 group-hover/bookmark:text-yellow-400'
        "
      />
    </button>
  </div>
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
