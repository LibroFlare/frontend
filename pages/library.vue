<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-8">
      {{ t('global.pages.library') }}
    </h1>
    <div
      v-if="bookmarks.length === 1"
      class="w-full flex flex-col items-center gap-4"
    >
      <h1>No media found...</h1>
      <ButtonLink href="/" class="lg:w-1/5">Browse</ButtonLink>
    </div>
    <div v-else class="w-3/5 flex flex-col items-center gap-16">
      <div class="w-full flex flex-col items-start gap-4">
        <b class="text-2xl flex items-center justify-center gap-2">
          <Icon name="mdi:book-open-page-variant-outline" /> Continue reading
        </b>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <MediaCard v-for="media in readings" :key="media.id" :meta="media" />
        </div>
      </div>
      <div class="w-full flex flex-col items-start gap-4">
        <b class="text-2xl flex items-center justify-center gap-2">
          <Icon name="mdi:book-heart-outline" /> Bookmarks
        </b>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <MediaCard v-for="media in bookmarks" :key="media.id" :meta="media" />
        </div>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.library')) })

const { bookmarks, readings } = toRefs(useLibraryStore())
</script>

<style lang="scss" scoped></style>
