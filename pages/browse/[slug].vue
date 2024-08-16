<template>
  <VueFrag>
    <p v-if="typing">Searching ...</p>
    <p v-else>Found results: {{ search }}</p>
  </VueFrag>
</template>

<script lang="ts" setup>
const { search, typing } = toRefs(useSearchStore())
</script>

<style lang="scss"></style>
