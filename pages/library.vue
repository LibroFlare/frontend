<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-8">
      {{ t('global.pages.library') }}
    </h1>
    <div
      v-if="bookmarks.length > 0"
      class="w-3/5 flex flex-col items-center gap-16"
    >
      <LibraryReadings />
      <LibraryBookmarks />
    </div>
    <div v-else class="w-full flex flex-col items-center gap-4">
      <h1>No media found...</h1>
      <div class="flex items-center gap-8">
        <ButtonLink href="/discover">Discover</ButtonLink>
        <ButtonLink href="/" type="shadow">Browse</ButtonLink>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.library')) })

const { bookmarks } = toRefs(useLibraryStore())
</script>

<style lang="scss" scoped></style>
