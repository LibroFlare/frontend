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

const media = (await searchMedia(slug, 1))[0]
</script>

<style lang="scss" scoped></style>
