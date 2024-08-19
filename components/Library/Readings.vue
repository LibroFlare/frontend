<template>
  <div class="w-full flex flex-col items-start gap-4">
    <b class="text-2xl flex items-center justify-center gap-2">
      <Icon name="mdi:book-open-page-variant-outline" /> Continue reading
    </b>
    <MediaGrid v-if="readings.length > 0" :media="readings" />
    <p v-else>no media yet...</p>
  </div>
</template>

<script lang="ts" setup>
const { readings } = toRefs(useLibraryStore())
</script>

<style lang="scss"></style>
