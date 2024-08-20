<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {{ t('home.filter.title') }}
      </h2>
      <div class="flex space-x-4">
        <button
          v-for="type in mediaTypes"
          :key="type"
          :class="{
            'bg-blue-600 text-white': selectedType === type,
            'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300':
              selectedType !== type,
          }"
          class="px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-500 hover:text-white transform hover:scale-105"
          @click="setFilter(type)"
        >
          {{ capitalize(type) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mediaTypes = ['book', 'audiobook', 'comics', 'manga'] as const

const selectedType = ref<string>('')
const { t } = useI18n()

const setFilter = (type: string) => {
  selectedType.value = selectedType.value === type ? '' : type
  emit('filter-changed', selectedType.value)
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const emit = defineEmits<{
  (e: 'filter-changed', value: string): void
}>()
</script>
