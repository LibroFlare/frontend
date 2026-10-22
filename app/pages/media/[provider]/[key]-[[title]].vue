<template>
  <VueFrag>
    <MediaInfoSkeleton v-if="status === 'pending'" />
    <MediaInfo v-else-if="data" :media="data" />
    <p v-else>Media not found</p>
  </VueFrag>
</template>

<script lang="ts" setup>
import type { Media } from '~~/types'

const { findMedia } = useMediaStore()

const route = useRoute()
const { provider, key, title } = route.params as {
  provider: Providers
  key: Media['key']
  title?: Media['meta']['title']
}

const { data, status } = await useAsyncData(
  'media',
  () => findMedia(key, provider),
  { lazy: true },
)

useSeoMeta({
  title: computed(() => data.value?.meta?.title || title || 'Media'),
})
</script>

<style lang="scss" scoped></style>
