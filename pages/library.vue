<template>
  <div class="cont-inner flex flex-col items-center gap-8">
    <h1 class="flex items-center justify-center gap-4">
      <Icon name="material-symbols:menu-book" class="size-12 text-white" />
      {{ t('global.pages.library') }}
    </h1>
    <template v-if="bookmarks.length > 0">
      <div
        class="flex flex-col items-center gap-16 transition-all duration-300"
      >
        <LibraryReadings />
        <LibraryBookmarks />
      </div>
    </template>

    <div v-else class="w-full flex flex-col items-center gap-4 text-center">
      <h2>{{ t('library.noMedia') }}</h2>
      <div class="flex items-center gap-8 mt-4 transition-all duration-300">
        <ButtonLink href="/discover">
          <Icon name="material-symbols:menu-book" class="size-6" />
          {{ t('library.discover') }}
        </ButtonLink>
        <span class="text-gray-500">{{ t('library.or') }}</span>
        <ButtonLink href="/" type="shadow">
          <Icon name="solar:compass-bold" class="size-6" />
          {{ t('library.browse') }}
        </ButtonLink>
      </div>
      <Icon
        name="fluent-emoji-high-contrast:thinking-face"
        class="w-10 h-10 transition-all duration-300"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.library')) })

const { bookmarks } = toRefs(useLibraryStore())
</script>

<style lang="scss" scoped></style>
