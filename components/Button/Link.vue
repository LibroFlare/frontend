<template>
  <NuxtLink
    :href
    class="flex items-center gap-2 border-2 shadow-lg text-center truncate transition-all"
    :class="{
      'bg-gray-700 hover:bg-gray-600': type === 'main',
      'border-gray-700 hover:bg-gray-700/40': type === 'shadow',
      'border-transparent': type !== 'shadow',
      'px-2 py-1 rounded-md text-sm': size === 'sm',
      'px-4 py-2 rounded-lg text-lg': size === 'md',
      'px-8 py-4 rounded-xl text-xl': size === 'lg',
      'px-12 py-6 rounded-2xl text-2xl': size === 'xl',
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
const {
  href,
  type = 'main',
  size = 'md',
} = defineProps<{
  href: string
  type?: 'main' | 'shadow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<style lang="scss"></style>
