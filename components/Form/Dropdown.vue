<template>
  <div ref="dropdown" class="relative my-4 max-w-[25rem]">
    <div
      class="relative w-full rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors py-3 pl-3 pr-10 text-left text-white shadow-md focus:outline-none tabbable cursor-pointer"
      @click="toggleDropdown"
    >
      <span class="flex gap-4 items-center truncate">
        <Icon
          v-if="selectedItem.icon"
          :name="selectedItem.icon"
          class="size-6"
        />
        {{ selectedItem.name }}
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <Icon name="ph:caret-up-down-fill" class="size-6" />
      </span>
    </div>
    <div
      v-if="isOpen"
      class="absolute left-0 right-0 top-10 z-[1] mt-4 max-h-60 overflow-auto rounded-md bg-gray-800 text-white shadow-lg ring-1 ring-black ring-opacity-5 scrollbar-thin scrollbar-track-background-secondary scrollbar-thumb-type-secondary focus:outline-none"
    >
      <div
        v-for="opt in options"
        :key="opt.id"
        :class="{
          'cursor-pointer flex gap-4 items-center relative select-none py-3 px-4 hover:bg-gray-700': true,
          'bg-gray-700/40 text-type-link': isActive(opt),
          'text-white': !isActive(opt),
        }"
        @click="selectOption(opt)"
      >
        <Icon v-if="opt.icon" :name="opt.icon" class="size-6" />
        {{ opt.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OptionItem } from '~/types'

const { selectedItem, options } = defineProps<{
  selectedItem: OptionItem
  options: OptionItem[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedItem', value: OptionItem): void
}>()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: OptionItem) => {
  emit('update:selectedItem', option)
  isOpen.value = false
}

const isActive = (option: OptionItem) => option.id === selectedItem.id

const dropdown = ref<HTMLElement>()
onClickOutside(dropdown, () => (isOpen.value = false))
</script>

<style lang="scss" scoped></style>
