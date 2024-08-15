<template>
  <main
    class="relative w-full h-screen grid place-items-center overflow-hidden bg-gray-900"
  >
    <h1>LibroFlare</h1>
  </main>
</template>

<script lang="ts" setup></script>

<style scoped>
@keyframes floating {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

@keyframes background {
  0%,
  100% {
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
