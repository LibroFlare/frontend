<template>
  <VueFrag>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const siteName = t('global.name') || 'LibroFlare'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteName}` : siteName
  },
})
</script>
