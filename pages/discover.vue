<template>
  <VueFrag>
    <h1 class="flex items-center gap-2">
      <Icon name="iconamoon:discover-bold" /> {{ t('global.pages.discover') }}
    </h1>
    <div class="w-3/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <MediaCard v-for="(meta, key) in media" :key="key" :meta="meta" />
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
import { getTrendingMedia } from '~/providers/openlibrary'

const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.discover')) })

const media = await getTrendingMedia()
</script>

<style lang="scss" scoped></style>
