<template>
  <VueFrag>
    <MediaInfoSkeleton v-if="status === 'pending'" />
    <MediaInfo v-else-if="data" :media="data" />
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
    transform: (media) => media[0],
  },
)

useSeoMeta({ title: computed(() => data.value?.meta?.title || 'Media') })
</script>

<style lang="scss" scoped></style>
