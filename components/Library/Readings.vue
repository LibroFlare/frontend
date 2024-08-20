<template>
  <div
    v-if="show || readings.length > 0"
    class="w-full flex flex-col items-start gap-4"
  >
    <b class="text-2xl flex items-center justify-center gap-2">
      <Icon name="mdi:book-open-page-variant-outline" />
      {{ t('home.reading.continue') }}
    </b>
    <MediaGrid v-if="readings.length > 0" :media="readings" />
    <p v-else>{{ t('home.reading.noMedia') }}</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { readings } = toRefs(useLibraryStore())

// show even if no media is there
const { show } = defineProps<{ show: boolean }>()
</script>

<style lang="scss"></style>
