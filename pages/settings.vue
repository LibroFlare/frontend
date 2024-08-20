<template>
  <VueFrag>
    <h1>{{ t('global.pages.settings') }}</h1>
    <div
      class="cont-inner flex flex-col gap-12 mb-16 px-4 py-8 rounded-lg shadow-custom"
    >
      <div class="flex flex-col gap-2">
        <b class="text-lg">{{ t('settings.language') }}</b>
        <LangSwitcher />
      </div>

      <div class="flex flex-col gap-2">
        <b class="text-lg">{{ t('settings.theme') }}</b>
        <ThemeSwitcher />
      </div>

      <div class="flex flex-col gap-2">
        <b class="text-lg">{{ t('settings.providers') }}</b>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.settings')) })
</script>

<style lang="scss" scoped></style>
