<template>
  <section id="sources">
    <div class="w-full flex flex-col gap-2 p-4 rounded-xl shdw">
      <b>Sources</b>
      <MediaSourcesList
        v-if="media.meta.sources"
        :sources="media.meta.sources"
      />
      <p v-else>No Sources Found...</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Media } from '~~/types'

const { media } = defineProps<{ media: Media }>()
</script>

<style lang="scss"></style>
