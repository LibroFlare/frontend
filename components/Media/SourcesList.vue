<template>
  <ul class="flex flex-col gap-1">
    <li v-for="(source, key) in sources" :key>
      <NuxtLink
        :href="source.href"
        target="_blank"
        class="relative flex px-4 py-2"
      >
        {{ source.type || source.href }}
        <button
          v-if="source.sources"
          class="absolute top-0 right-4 h-full grid place-items-center bg-transparent z-[1]"
          @click.prevent="toggle[key] = !toggle[key]"
        >
          <Icon name="ph:caret-up-down-fill" class="size-6" />
        </button>
      </NuxtLink>
      <MediaSourcesList
        v-if="source.sources && toggle[key]"
        :sources="source.sources"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Media } from '~/types'

const { sources } = defineProps<{ sources: Media['meta']['sources'] }>()

const toggle = ref<boolean[]>([])
</script>

<style lang="scss" scoped>
ul > li {
  &:has(ul) {
    @apply flex flex-col gap-1;

    > ul {
      @apply ml-6;
    }
  }

  &:not(:has(ul)),
  &:has(ul) > a {
    @apply rounded-lg hover:bg-gray-600/20 shdw transition-colors;
  }
}
</style>
