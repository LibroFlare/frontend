<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-8">{{ t('global.pages.settings') }}</h1>
    <div
      class="w-3/5 flex flex-col gap-12"
      :class="{
        'bg-white text-black': theme === 'light',
        'bg-black text-white': theme === 'dark',
      }"
    >
      <div class="flex flex-col">
        <b class="text-lg">{{ t('settings.language') }}</b>
        <LangSwitcher />
      </div>
      <div class="flex flex-col">
        <b class="text-lg">{{ t('settings.theme') }}</b>
        <div class="flex items-center gap-4 mt-2">
          <select
            @change="changeTheme"
            :value="theme"
            class="p-2 border rounded transition-colors bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="light" class="flex items-center gap-2">
              <Icon name="solar:sun-bold-duotone" class="w-5 h-5" />
              {{ t('settings.themes.light') }}
            </option>
            <option value="dark" class="flex items-center gap-2">
              <Icon name="material-symbols:dark-mode-outline" class="w-5 h-5" />
              {{ t('settings.themes.dark') }}
            </option>
            <option value="system" class="flex items-center gap-2">
              <Icon name="cib:automatic" class="w-5 h-5" />
              {{ t('settings.themes.system') }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col">
        <b class="text-lg">{{ t('settings.providers') }}</b>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '~/stores/themes'

const { t } = useI18n()
const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)

const changeTheme = (event: Event) => {
  const selectedTheme = (event.target as HTMLSelectElement).value
  console.log('Selected theme:', selectedTheme)
  themeStore.setTheme(selectedTheme)
}

onMounted(() => {
  const detectSystemTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log('System prefers dark mode:', isDarkMode)
    themeStore.setTheme(isDarkMode ? 'dark' : 'light')
  }

  detectSystemTheme()
})

watch(
  () => themeStore.theme,
  (newTheme) => {
    console.log('Theme changed to:', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  },
)
</script>

<style lang="scss" scoped></style>
