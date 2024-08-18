<template>
  <NuxtLink
    :href
    class="px-8 py-4 rounded-xl border-2 shadow-lg text-center truncate"
    :class="{
      'bg-gray-700': type === 'main',
      'border-gray-700': type === 'shadow',
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
