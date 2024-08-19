<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <MediaCard
      v-for="meta in media"
      v-if="media && media.length > 0 && !skeleton"
      :key="meta.id"
      :meta
    />
    <MediaCardSkeleton
      v-for="key in skeletonLength || 4"
      v-else-if="skeleton"
      :key
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { MediaMeta } from '~/types'

const { media, skeleton, skeletonLength } = defineProps<{
  media?: MediaMeta[] | null
  skeleton?: boolean
  skeletonLength?: number
}>()
</script>

<style lang="scss" scoped></style>
