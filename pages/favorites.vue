<template>
  <VueFrag>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      {{ t('global.pages.favorites') }}
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="book in favorites"
        :key="book.id"
        class="relative bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition-all duration-300"
      >
        <div class="absolute top-2 right-2">
          <Icon name="zondicons:bookmark" class="text-yellow-400 text-2xl" />
        </div>

        <div
          class="w-full flex items-center justify-center aspect-[2/3] rounded-md overflow-hidden mb-4"
        >
          <NuxtImg :src="book.cover" alt="Book cover" class="w-full" />
        </div>
        <div class="flex flex-col items-start text-start gap-2">
          <b
            class="text-lg font-semibold text-white leading-tight line-clamp-2"
          >
            {{ book.title }}
          </b>
          <p class="text-sm text-gray-400">{{ book.author }}</p>
          <p class="flex gap-1.5">
            <span class="text-xs text-gray-500 capitalize">
              {{ book.type }}
            </span>
            <span class="text-xs text-gray-500 capitalize">●</span>
            <span class="text-xs text-gray-500">{{ book.year }}</span>
          </p>
        </div>
      </div>
    </div>
  </VueFrag>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({ title: computed(() => t('global.pages.favorites')) })

const { favorites } = toRefs(useFavoritesStore())
</script>

<style lang="scss" scoped></style>
