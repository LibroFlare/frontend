<template>
  <div class="cont-inner flex flex-col items-center gap-8">
    <h1 class="flex items-center gap-2">
      <Icon name="iconamoon:discover-bold" /> {{ t('global.pages.discover') }}
    </h1>
    <MediaGrid :medias="data" :skeleton="status === 'pending'" />
  </div>
</template>

<script lang="ts" setup>
import { getTrendingMedia } from '~~/providers/openlibrary'

const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.discover')) })

const { data, status } = await useAsyncData('media', () => getTrendingMedia(), {
  lazy: true,
})
</script>

<style lang="scss" scoped></style>
