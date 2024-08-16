<template>
  <VueFrag>
    <div class="fixed inset-0 z-0 anim-bg pointer-events-none">
      <div
        class="absolute top-1/4 left-1/3 bg-gray-600 opacity-30 blur-xl w-36 h-52 transform anim-float"
      />
      <div
        class="absolute bottom-1/4 right-1/4 bg-gray-500 opacity-30 blur-xl w-28 h-40 transform anim-float delay-300"
      />
      <div
        class="absolute top-2/3 left-1/4 bg-gray-400 opacity-30 blur-xl w-40 h-56 transform anim-float delay-500"
      />
    </div>

    <ButtonBackToTop />
    <AppHeader />
    <main
      class="container mx-auto relative w-full flex flex-col items-center gap-8 pt-20 overflow-hidden"
    >
      <section id="welcome">
        <h1>Welcome to {{ $t('global.name') }}</h1>
        <SearchBar class="w-full" />
      </section>
      <slot />
    </main>
    <AppFooter />
  </VueFrag>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.anim-float {
  animation: floating 4s ease-in-out infinite;
}

.anim-bg {
  animation: all 10s linear infinite;
}
</style>
