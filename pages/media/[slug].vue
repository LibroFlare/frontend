<template>
  <VueFrag>
    <MediaInfoSkeleton v-if="status === 'pending'" />
    <MediaInfo v-else-if="data" :meta="data" />
    <p v-else>Media not found</p>
  </VueFrag>
</template>

<script lang="ts" setup>
import { searchMedia } from '~/providers/openlibrary'

const route = useRoute()
const { slug } = route.params as { slug: string }

const { data, status } = await useAsyncData(
  'media',
  () => searchMedia(slug, 1),
  {
    lazy: true,
    transform: (meta) => meta[0],
  },
)
</script>

<style lang="scss" scoped></style>
