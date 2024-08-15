<template>
  <main class="relative w-full h-screen grid place-items-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0 z-0 animate-background">
      <div class="absolute top-1/4 left-1/3 bg-gray-600 opacity-30 blur-xl w-36 h-52 transform animate-floating"></div>
      <div class="absolute bottom-1/4 right-1/4 bg-gray-500 opacity-30 blur-xl w-28 h-40 transform animate-floating delay-300"></div>
      <div class="absolute top-2/3 left-1/4 bg-gray-400 opacity-30 blur-xl w-40 h-56 transform animate-floating delay-500"></div>
    </div>

    <AppHeader />
    <AppFooter />
    <ButtonBackToTop />
  </main>
</template>

<script lang="ts" setup>
</script>

<style scoped>
@keyframes floating {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

@keyframes background {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

.animate-floating {
  animation: floating 4s ease-in-out infinite;
}

.animate-background {
  animation: all 10s linear infinite;
}
</style>
