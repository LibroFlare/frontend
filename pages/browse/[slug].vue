<template>
  <main class="w-full grid place-items-center">
    <p v-if="typing">hledám ...</p>
    <p v-else>Hledaný výraz: {{ search }}</p>
  </main>
</template>

<script lang="ts" setup>
const { search, typing } = toRefs(useSearchStore())
</script>

<style lang="scss"></style>
