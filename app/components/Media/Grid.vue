<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
  >
    <MediaCard
      v-for="media in medias"
      v-if="medias && medias.length > 0 && !skeleton"
      :key="media.key"
      :media
    />
    <MediaCardSkeleton
      v-for="key in skeletonLength"
      v-else-if="skeleton"
      :key
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { Media } from '~~/types'

const {
  medias,
  skeleton = false,
  skeletonLength = 4,
} = defineProps<{
  medias?: Media[] | null
  skeleton?: boolean
  skeletonLength?: number
}>()
</script>

<style lang="scss" scoped></style>
