<template>
  <VueFrag>
    <h1>{{ t('global.pages.favorites') }}</h1>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.favorites')) })
</script>

<style lang="scss" scoped></style>
