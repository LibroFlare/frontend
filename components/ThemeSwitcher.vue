<template>
  <FormDropdown
    :options="items"
    :selected-item="selectedItem"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem, Themes } from '~/types'

const { t } = useI18n()
const prefs = usePreferencesStore()

const items = computed(() => [
  { id: 'system', name: t('settings.themes.system') },
  { id: 'dark', name: t('settings.themes.dark') },
  { id: 'light', name: t('settings.themes.light') },
])

const findItem = (): OptionItem =>
  items.value.find(({ id }) => id === prefs.theme) || items.value[0]

const selectedItem = ref<OptionItem>(findItem())

watchEffect(() => (selectedItem.value = findItem()))
watch(selectedItem, () => prefs.setTheme(selectedItem.value.id as Themes))
</script>
