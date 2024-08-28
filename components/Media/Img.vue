<template>
  <NuxtImg
    :src="media.meta.cover || '/cover_not_available.webp'"
    :alt="
      media.meta.cover ? `Cover of ${media.meta.title}` : 'Cover not found...'
    "
    class="min-h-full"
  />
</template>

<script lang="ts" setup>
import type { Media } from '~/types'

const { media } = defineProps<{ media: Media }>()
</script>

<style lang="scss"></style>
