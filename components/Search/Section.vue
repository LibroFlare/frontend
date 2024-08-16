<template>
  <section
    id="welcome"
    class="pt-8 flex flex-col gap-8 w-full text-center leading-tight"
  >
    <div class="w-3/5 mx-auto flex flex-col gap-2">
      <h1>What would you like to read today?</h1>
      <SearchBar class="w-full" />
    </div>
    <SearchResult />
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
