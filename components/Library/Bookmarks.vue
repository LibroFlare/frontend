<template>
  <div class="w-full flex flex-col items-start gap-4">
    <b class="text-2xl flex items-center justify-center gap-2">
      <Icon name="mdi:book-heart-outline" /> Bookmarks
    </b>
    <MediaGrid v-if="bookmarks.length > 0" :media="bookmarks" />
    <p v-else>no media yet...</p>
  </div>
</template>

<script lang="ts" setup>
const { bookmarks } = toRefs(useLibraryStore())
</script>

<style lang="scss"></style>
