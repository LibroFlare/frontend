<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-8">
      {{ t('global.pages.favorites') }}
    </h1>
    <div
      v-if="favorites.length === 0"
      class="w-full flex flex-col items-center gap-4"
    >
      <h1>No favorite media found</h1>
      <div class="w-1/2 grid grid-cols-2 items-center gap-4">
        <ButtonLink href="/library">Your Library</ButtonLink>
        <ButtonLink href="/" type="shadow">Browse...</ButtonLink>
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <MediaCard v-for="media in favorites" :key="media.id" :meta="media" />
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.favorites')) })

const { favorites } = toRefs(useLibraryStore())
</script>

<style lang="scss" scoped></style>
