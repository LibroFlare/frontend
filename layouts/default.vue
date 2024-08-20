<template>
  <VueFrag>
    <div class="fixed inset-0 z-0 anim-bg pointer-events-none">
      <template v-if="preference !== 'light'">
        <div
          class="blflr top-0 -right-[25vw] bg-gradient-to-l from-primary-800 to-primary-900"
        />
        <div
          class="blflr top-0 -right-[10vw] opacity-35 bg-gradient-to-l from-primary-700 to-primary-900"
        />
        <div
          class="blflr bottom-0 -left-[25vw] bg-gradient-to-l from-primary-900 to-primary-950"
        />
        <div
          class="blflr bottom-0 -left-[10vw] opacity-35 bg-gradient-to-l from-primary-800 to-primary-950"
        />
      </template>
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
    <NetworkStatusBar />
    <AppHeader />
    <main
      class="cont relative w-full flex flex-col items-center gap-8 pt-28 pb-8"
    >
      <SearchSection
        v-if="['index', 'browse-slug'].includes(route.name?.toString() || '')"
      />
      <slot />
    </main>
    <AppFooter />
  </VueFrag>
</template>

<script lang="ts" setup>
const route = useRoute()
const { preference } = toRefs(useColorMode())
</script>

<style lang="scss">
.anim-float {
  animation: floating 4s ease-in-out infinite;
}

.anim-bg {
  animation: all 10s linear infinite;
}

.blflr {
  @apply absolute w-[50vw] h-[30vh] rotate-[30deg] blur-3xl rounded-full -z-20;
}
</style>
