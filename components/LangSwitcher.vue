<template>
  <FormDropdown
    :selected-item="selectedItem"
    :options="items"
    @update:selected-item="(val) => (selectedItem = val)"
  />
</template>

<script lang="ts" setup>
import type { OptionItem } from '~/types'

const { locales, locale, setLocale } = useI18n()

const items: OptionItem[] = locales.value.map(({ code, name, icon }) => {
  return {
    id: code,
    name: name || code,
    icon: icon,
  }
})

const selectedItem = ref<OptionItem>(
  items.find(({ id }) => id === locale.value) || items[0],
)

watch(selectedItem, () => setLocale(selectedItem.value.id))
</script>

<style lang="scss" scoped></style>
