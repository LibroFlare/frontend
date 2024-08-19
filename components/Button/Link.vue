<template>
  <NuxtLink
    :href
    class="flex items-center gap-2 px-8 py-4 rounded-xl border-2 shadow-lg text-center truncate transition-all"
    :class="{
      'bg-gray-700 hover:bg-gray-600': type === 'main',
      'border-gray-700 hover:bg-gray-700/40': type === 'shadow',
      'border-transparent': type !== 'shadow',
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
const { href, type } = withDefaults(
  defineProps<{
    href: string
    type?: 'main' | 'shadow'
  }>(),
  { type: 'main' },
)
</script>

<style lang="scss"></style>
