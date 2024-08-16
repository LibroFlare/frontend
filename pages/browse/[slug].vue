<template>
  <VueFrag>
    <SearchSection />
  </VueFrag>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()

const setSeoTitle = () => useSeoMeta({ title: t('home.search.sectionTitle') })

setSeoTitle()
watch(locale, setSeoTitle)
</script>

<style lang="scss" scoped></style>
