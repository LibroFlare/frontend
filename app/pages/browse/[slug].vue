<template>
  <VueFrag />
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('home.search.sectionTitle')) })
</script>

<style lang="scss" scoped></style>
