<template>
  <FormDropdown
    :selected-item="selectedItem"
    :options="items"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~~/types'

const { locales } = useI18n()
const prefs = usePreferencesStore()

const items: OptionItem<string>[] = locales.value.map(
  ({ code, name, icon }) => {
    return {
      id: code,
      name: name || code,
      icon: typeof icon === 'string' ? icon : undefined,
      data: code,
    }
  },
)

const selectedItem = ref<OptionItem<string>>(
  items.find(({ id }) => id === prefs.language) || {
    id: 'en',
    name: 'English',
    data: 'en',
  },
)

watch(selectedItem, () => prefs.setLanguage(selectedItem.value.data))
</script>

<style lang="scss" scoped></style>
