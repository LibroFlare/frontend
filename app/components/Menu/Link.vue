<template>
  <NuxtLink
    :href="link.href"
    class="hover:text-gray-300 flex gap-2 items-center transition-all duration-300 ease-in-out"
    :class="scale && 'hover:scale-110'"
  >
    <Icon v-if="link.icon" :name="link.icon" class="size-6" />
    <span>{{ link.name }}</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { MenuLink } from '~~/types'

const { link, scale = false } = defineProps<{
  link: MenuLink
  scale?: boolean
}>()
</script>

<style lang="scss"></style>
