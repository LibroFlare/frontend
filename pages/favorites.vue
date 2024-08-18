<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      {{ t('global.pages.favorites') }}
    </h1>
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

const { favorites } = toRefs(useFavoritesStore())
</script>

<style lang="scss" scoped></style>
