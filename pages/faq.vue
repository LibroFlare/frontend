<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1
      class="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200"
    >
      Frequently Asked Questions
    </h1>

    <div class="space-y-8">
      <div
        v-for="index in 3"
        :key="index"
        class="relative bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div
          v-if="index !== 1"
          class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"
        ></div>

        <button
          @click="toggle(index)"
          class="w-full flex justify-between items-center text-left focus:outline-none"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Question {{ index }}
          </h2>
          <Icon
            :name="openIndex === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
            class="text-gray-600 dark:text-gray-400 transition-transform duration-300"
          />
        </button>

        <transition name="slide-fade">
          <p
            v-if="openIndex === index"
            class="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            Answer for question {{ index }}.
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
