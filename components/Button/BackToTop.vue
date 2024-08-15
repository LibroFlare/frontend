<template>
    <div>
      <button 
        class="fixed bottom-8 right-8 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all transform hover:scale-110"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"></path>
        </svg>
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  const showBackToTop = ref(true);
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  </script>
  