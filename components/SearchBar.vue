<template>
    <div class="flex items-center justify-center min-h-screen px-4">
      <form action="" method="post" class="relative w-full max-w-lg">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for books, comics, manga..."
          required
          class="w-full py-3 pl-10 pr-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none 
          focus:ring-2 focus:ring-blue-500 duration-300 placeholder-gray-400"
        />
        <label for="search" class="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="feather:search" class="text-gray-400 size-5 transition-transform duration-300 hover:scale-110" />
        </label>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped></style>
  