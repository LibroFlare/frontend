<template>
  <header class="fixed top-0 w-full text-white py-4 backdrop-blur-md bg-opacity-75">
    <div class="container mx-auto flex justify-around items-center">
      
      <nav class="space-x-4 flex items-center">
        <a href="#" class="hover:text-gray-300 flex items-center">
          <span class="mr-2">📚</span> My Library
        </a>
        <a href="#" class="hover:text-gray-300 flex items-center">
          <span class="mr-2">🔖</span> Wishlist
        </a>
      </nav>

      <div class="text-2xl font-semibold flex-1 text-center hover:scale-105 transform transition duration-300 ease-in-out">
        LibroFlare
      </div>
      
      <nav class="space-x-4 flex items-center">
        <a href="#" class="hover:text-gray-300 flex items-center">
          <span class="mr-2">👤</span> My Account
        </a>
        <a href="#" class="hover:text-gray-300 flex items-center">
          <span class="mr-2">📖</span> Continue Reading
        </a>
      </nav>

      <div class="relative flex-1 max-w-xs">
        <input 
          type="text" 
          placeholder="Search..." 
          class="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span class="absolute right-3 top-2 text-gray-400">
          🔍
        </span>
      </div>

    </div>
  </header>
</template>

<script lang="ts" setup>
</script>

<style scoped>
</style>
