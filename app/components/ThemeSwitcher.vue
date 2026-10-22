<template>
  <FormDropdown
    :options="items"
    :selected-item="selectedItem"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem, Themes } from '~~/types'

const { t } = useI18n()
const prefs = usePreferencesStore()

const items = computed<OptionItem<Themes>[]>(() => [
  { id: 'system', name: t('settings.themes.system'), data: 'system' },
  { id: 'dark', name: t('settings.themes.dark'), data: 'dark' },
  { id: 'light', name: t('settings.themes.light'), data: 'light' },
])

const findItem = (): OptionItem<Themes> =>
  items.value.find(({ id }) => id === prefs.theme) || {
    id: 'system',
    name: t('settings.themes.system'),
    data: 'system',
  }

const selectedItem = ref<OptionItem<Themes>>(findItem())

watchEffect(() => (selectedItem.value = findItem()))
watch(selectedItem, () => prefs.setTheme(selectedItem.value.data))
</script>
