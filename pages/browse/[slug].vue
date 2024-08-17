<template>
  <VueFrag>
    <SearchSection />
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const title = computed(() => t('home.search.sectionTitle'))
useSeoMeta({ title })
</script>

<style lang="scss" scoped></style>
