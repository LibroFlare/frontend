<template>
  <FormDropdown
    :options="items"
    :selected-item="selectedItem"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~/types'

const { t } = useI18n()
const { preference } = toRefs(useColorMode())

const items = [
  { id: 'system', name: t('settings.themes.system') },
  { id: 'dark', name: t('settings.themes.dark') },
  { id: 'light', name: t('settings.themes.light') },
]

const findItem = (): OptionItem =>
  items.find(({ id }) => id === preference.value) || items[0]

const selectedItem = ref<OptionItem>(findItem())

watch(preference, () => (selectedItem.value = findItem()))
watch(selectedItem, () => (preference.value = selectedItem.value.id))
</script>
