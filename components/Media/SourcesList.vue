<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="source in sources"
      :key="source.href"
      class="rounded-lg hover:bg-gray-600/20 shdw transition-colors"
    >
      <MediaSourcesList v-if="source.sources" :sources="source.sources" />
      <NuxtLink
        v-else
        :href="source.href"
        target="_blank"
        class="flex px-4 py-2"
      >
        {{ source.type || source.href }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Media } from '~/types'

const { sources } = defineProps<{ sources: Media['meta']['sources'] }>()
</script>

<style lang="scss" scoped>
ul > li:has(ul) {
  @apply ml-4;
}
</style>
