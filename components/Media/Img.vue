<template>
  <NuxtImg
    :src="cover || '/cover_not_available.webp'"
    :alt="cover ? `Cover of ${title}` : 'Cover not found...'"
    class="min-h-full"
  />
</template>

<script lang="ts" setup>
import type { Media } from '~/types'

const { media } = defineProps<{ media: Media }>()
const { title, cover } = media.meta
</script>

<style lang="scss"></style>
