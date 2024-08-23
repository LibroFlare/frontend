<template>
  <div
    v-if="show || bookmarks.length > 0"
    class="w-full flex flex-col items-start gap-4"
  >
    <b class="text-2xl flex items-center justify-center gap-2">
      <Icon name="mdi:book-heart-outline" /> {{ t('home.reading.bookmarks') }}
    </b>
    <MediaGrid v-if="bookmarks.length > 0" :medias="bookmarks" />
    <p v-else>{{ t('home.reading.noMedia') }}</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { bookmarks } = toRefs(useLibraryStore())

// show even if no media is there
const { show } = defineProps<{ show?: boolean }>()
</script>

<style lang="scss"></style>
