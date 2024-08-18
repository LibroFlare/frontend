<template>
  <VueFrag>
    <h1>{{ t('global.pages.discover') }}</h1>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.discover')) })
</script>

<style lang="scss" scoped></style>
