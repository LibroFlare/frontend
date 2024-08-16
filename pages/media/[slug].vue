<template>
  <VueFrag>
    <p v-if="!media">Media not found</p>
    <MediaInfo v-else :meta="media" />
  </VueFrag>
</template>

<script lang="ts" setup>
import { searchMedia } from '~/providers/openlibrary'

const route = useRoute()
const { slug } = route.params as { slug: string }

const media = ref()
const data = await searchMedia(slug, 1)
media.value = data && data.length > 0 ? data[0] : null
</script>

<style lang="scss" scoped></style>
