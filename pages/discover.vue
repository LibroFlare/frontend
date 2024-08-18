<template>
  <VueFrag>
    <h1 class="flex items-center gap-2">
      <Icon name="iconamoon:discover-bold" /> {{ t('global.pages.discover') }}
    </h1>
    <div class="w-3/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <MediaCardSkeleton v-for="i in 4" v-if="status === 'pending'" :key="i" />
      <MediaCard
        v-for="(meta, key) in data"
        v-else
        :key="key"
        :meta="meta"
        @click.prevent=""
      />
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
import { getTrendingMedia } from '~/providers/openlibrary'

const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.discover')) })

const { data, status } = await useAsyncData('media', () => getTrendingMedia(), {
  lazy: true,
})
</script>

<style lang="scss" scoped></style>
