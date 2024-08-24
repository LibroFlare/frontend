<template>
  <FormDropdown
    :options="items"
    :selected-item="selectedItem"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~/types'

const prefs = usePreferencesStore()

const items = Object.values(ProviderSources).map((source) => ({
  id: source,
  name: source,
}))

const selectedItem = ref<OptionItem>(
  items.find((source) => source.id === prefs.provider) || items[0],
)

watch(selectedItem, () =>
  prefs.setProvider(selectedItem.value.id as ProviderSources),
)
</script>
