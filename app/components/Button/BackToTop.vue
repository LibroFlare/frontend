<template>
  <button
    v-if="y > 300"
    class="fixed bottom-8 right-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all transform hover:scale-110 z-20"
    @click="y = 0"
  >
    <Icon name="material-symbols:arrow-upward" class="size-6" />
  </button>
</template>

<script lang="ts" setup>
const { y } = useWindowScroll({ behavior: 'smooth' })
</script>
