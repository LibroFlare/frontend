<template>
  <ul class="flex items-center justify-center gap-4">
    <li v-for="type in types" :key="type">
      <NuxtLink
        :href="`/account/sign${type}`"
        :class="type === sign ? 'bg-gray-400' : 'bg-gray-600'"
        class="px-4 py-2 rounded-lg capitalize hover:bg-opacity-80 transition-colors"
      >
        {{ `Sign ${type}` }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
type Types = 'up' | 'in'

const types: Types[] = ['up', 'in']

const { sign } = defineProps<{ sign: Types }>()
</script>

<style lang="scss"></style>
