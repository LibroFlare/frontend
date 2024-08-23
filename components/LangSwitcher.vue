<template>
  <FormDropdown
    :selected-item="selectedItem"
    :options="items"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~/types'

const { locales } = useI18n()
const prefs = usePreferencesStore()

const items: OptionItem[] = locales.value.map(({ code, name, icon }) => {
  return {
    id: code,
    name: name || code,
    icon,
  }
})

const selectedItem = ref<OptionItem>(
  items.find(({ id }) => id === prefs.language) || items[0],
)

watch(selectedItem, () => prefs.setLanguage(selectedItem.value.id))
</script>

<style lang="scss" scoped></style>
