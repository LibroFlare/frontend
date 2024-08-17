<template>
    <div class=" bg-gray-900 text-white flex flex-col items-center mr-12 py-12">
      <div class="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-12">
        <div class="flex items-center gap-6 mb-8">
          <div class="flex-shrink-0">
            <NuxtImg src="/logo.png" alt="Profile Image" class="w-24 h-24 rounded-full cursor-pointer" />
            
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold mb-2">{{ buttons.username }}</h1>
            <p class="text-lg mb-2">Email: {{ buttons.email }}</p>
            <p class="text-lg mb-2">Heslo: ●●●●●●●●</p>
            <p class="text-lg mb-2">Uživatelské jméno: {{ buttons.username }}</p>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button class="bg-slate-400 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            Uložit změny
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { AccountButtons } from '~/types'
  const buttons : AccountButtons = {
    username: 'ahoj', email: 'llll', password: '...'
  } 
  </script>
  
  <style scoped>
  </style>
  