<template>
  <div
    class="min-h-screen bg-transparent text-white flex flex-col items-center py-8"
  >
    <div class="w-full max-w-7xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8 text-center">
        {{ t('library.pageTitle') }}
      </h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
      >
        <MediaCard v-for="(book, index) in books" :key="index" :meta="book" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { MediaMeta } from '~/types'

const { t } = useI18n()

const books: MediaMeta[] = [
  {
    id: '1',
    slug: '/library/book-1',
    title: 'a',
    author: '1',
    cover: '/logo.png',
    type: 'audiobook',
    year: 2022,
  },
  {
    id: '1541515',
    slug: '/library/book-2',
    title: 'aa',
    author: '2',
    cover: '/logo.png',
    type: 'book',
    year: 2022,
  },
  {
    id: '1',
    slug: '/library/book-3',
    title: 'aavva',
    author: 'aaa',
    cover: '/logo.png',
    type: 'comics',
    year: 2022,
  },
]
</script>

<style scoped></style>
