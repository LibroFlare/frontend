<template>
  <VueFrag>
    <p v-if="typing">hledám ...</p>
    <p v-else>Hledaný výraz: {{ search }}</p>
  </VueFrag>
</template>

<script lang="ts" setup>
const { search, typing } = toRefs(useSearchStore())
</script>

<style lang="scss"></style>
