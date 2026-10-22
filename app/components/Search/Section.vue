<template>
  <section
    id="home"
    class="cont-inner flex flex-col items-center gap-8 text-center leading-tight"
  >
    <h1 class="w-3/5">{{ $t('home.titles.day.default') }}</h1>
    <SearchBar class="w-4/5" />
    <SearchResult />
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
