<template>
  <header class="fixed top-0 w-full text-white py-4 backdrop-blur-md bg-opacity-75 shadow-lg z-50">
    <div class="container mx-auto flex justify-between items-center px-6">

      <div class="flex-1 flex justify-center items-stretch relative">
        <nav class="hidden sm:flex space-x-4 items-center mr-4">
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">📚</span> My Library
          </a>
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">🔖</span> Wishlist
          </a>
        </nav>

        <div class="text-2xl font-bold text-center hover:scale-110 transform transition duration-300 ease-in-out mx-5">
          LibroFlare
        </div>

        <nav class="hidden sm:flex space-x-4 items-center ml-4">
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">👤</span> My Account
          </a>
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">📖</span> Continue Reading
          </a>
        </nav>
      </div>

      <div class="relative hidden sm:block max-w-xs ml-auto">
        <input 
          type="text" 
          placeholder="Looking for something ?" 
          class="w-full py-2 px-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div class="sm:hidden">
        <button @click="toggleMenu" class="text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="menuOpen" class="sm:hidden bg-gray-800 bg-opacity-95 py-4 px-6 space-y-4">
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        My Library
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        Wishlist
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        My Account
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        Continue Reading
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<style scoped>
</style>
