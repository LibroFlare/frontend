<template>
  <div
    class="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
  >
    <div class="flex flex-col items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('home.filter.title') }}
      </h2>
      <div class="flex flex-wrap justify-center space-x-4">
        <button
          v-for="type in mediaTypes"
          :key="type"
          :class="{
            'text-white bg-amber-400 shadow-lg': selectedType === type,
            'text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800':
              selectedType !== type,
          }"
          class="px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          @click="setFilter(type)"
        >
          {{ capitalize(type) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
