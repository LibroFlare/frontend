<template>
  <VueFrag>
    <h1>{{ t('global.pages.settings') }}</h1>
    <div class="w-3/5 flex flex-col gap-12 mb-16">
      <div class="flex flex-col">
        <b>{{ t('settings.language') }}</b>
        <LangSwitcher />
      </div>
      <div class="flex flex-col">
        <b>{{ t('settings.theme') }}</b>
        <ThemeSwitcher />
      </div>
      <div class="flex flex-col">
        <b>{{ t('settings.providers') }}</b>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.settings')) })
</script>

<style lang="scss" scoped></style>
