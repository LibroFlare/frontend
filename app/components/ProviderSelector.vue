<template>
  <FormDropdown
    :options="items"
    :selected-item="selectedItem"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~~/types'

const prefs = usePreferencesStore()

const items: OptionItem<Providers>[] = Object.values(ProvidersData).map(
  ({ id, name }) => ({
    id,
    name: name || id,
    data: id,
  }),
)

const selectedItem = ref<OptionItem<Providers>>(
  items.find((provider) => provider.id === prefs.provider) || {
    id: Providers.OPENLIBRARY,
    name: 'Open Library',
    data: Providers.OPENLIBRARY,
  },
)

watch(selectedItem, () => prefs.setProvider(selectedItem.value.data))
</script>
