<template>
  <div class="cont px-4">
    <div class="flex flex-col lg:flex-row items-start gap-8">
      <Transition name="fade">
        <div
          v-if="showFullImg"
          class="fixed inset-0 flex items-center justify-center bg-black/70 z-[30]"
          @click="showFullImg = false"
        >
          <MediaImgCont class="relative group/fullImg" @click.stop>
            <div
              class="absolute top-2 right-2 flex items-center justify-center p-1 rounded-full cursor-pointer group-hover/fullImg:opacity-100 opacity-0 backdrop-blur-sm hover:bg-gray-700/60 z-[1] transition-all shdw"
              @click="showFullImg = false"
            >
              <Icon name="radix-icons:cross-2" class="size-8" />
            </div>
            <MediaImg
              :media
              class="max-w-[90vw] sm:max-w-[70vw] h-[70vh] object-contain"
            />
          </MediaImgCont>
        </div>
      </Transition>

      <MediaImgCont class="relative w-64 cursor-pointer">
        <MediaBookmarkButton :media top-right />
        <MediaImg :media @click="showFullImg = !showFullImg" />
      </MediaImgCont>

      <div class="flex-1 space-y-4">
        <h1 class="text-3xl font-bold">{{ media.meta.title }}</h1>
        <p class="text-lg text-gray-400">By: {{ media.meta.author }}</p>
        <p class="text-md text-gray-500">{{ media.meta.year }}</p>
        <p class="text-md text-gray-500 capitalize">{{ media.meta.type }}</p>
        <p class="text-sm text-gray-300 leading-relaxed">
          {{ media.meta.description }}
        </p>

        <div class="flex gap-4 mt-6">
          <ButtonLink href="#sources">
            <Icon name="mdi:book-open-variant" class="size-6" />
            {{ t('book.startReading') }}
          </ButtonLink>
        </div>
      </div>
    </div>
    <section id="sources" class="h-auto">
      <div class="w-full flex flex-col gap-2 p-4 rounded-xl shdw">
        <b>Sources</b>
        <ul v-if="media.meta.sources" class="flex flex-col gap-2">
          <li
            v-for="source in media.meta.sources"
            :key="source.href"
            class="rounded-lg hover:bg-gray-600/20 shdw transition-colors"
          >
            <NuxtLink :href="source.href" class="flex px-4 py-2">
              {{ source.type || source.href }}
            </NuxtLink>
          </li>
        </ul>
        <p v-else>No Sources Found...</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Media } from '~/types'
const { t } = useI18n()

const { media } = defineProps<{ media: Media }>()

const showFullImg = ref<boolean>(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-to {
  @apply opacity-100;
}
</style>
