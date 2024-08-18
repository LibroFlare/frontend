<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-8">
      {{ t('global.pages.library') }}
    </h1>
    <div
      v-if="bookmarks.length === 0"
      class="w-full flex flex-col items-center gap-4"
    >
      <h1>No media found...</h1>
      <ButtonLink href="/" class="lg:w-1/5">Browse</ButtonLink>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <MediaCard v-for="media in bookmarks" :key="media.id" :meta="media" />
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.library')) })

const { bookmarks } = toRefs(useLibraryStore())
</script>

<style lang="scss" scoped></style>
