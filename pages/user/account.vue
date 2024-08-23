<template>
  <div class="cont-inner flex flex-col items-center py-12">
    <div
      class="shdw w-full max-w-4xl rounded-lg p-8 bg-opacity-80 backdrop-blur-md"
    >
      <div class="flex items-center gap-6 mb-8">
        <div class="relative group cursor-pointer">
          <NuxtImg
            src="/logo.png"
            alt="Profile Image"
            class="w-24 h-24 rounded-full border-2 border-gray-400 transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center"
          ></div>
        </div>
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold mb-2">
            {{ t('account.pageTitle') }}
          </h1>
          <p class="text-lg mb-2 border-b border-gray-600 pb-2">
            {{ t('account.email') }}:
            <span class="font-semibold">{{ buttons.email }}</span>
          </p>
          <p class="text-lg mb-2 border-b border-gray-600 pb-2">
            {{ t('account.password') }}:
            <span class="font-semibold">●●●●●●●●</span>
          </p>
          <p class="text-lg mb-2">
            {{ t('account.username') }}:
            <span class="font-semibold">{{ buttons.username }}</span>
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <input
          v-model="buttons.username"
          type="text"
          class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Změnit uživatelské jméno"
        />
        <input
          v-model="buttons.email"
          type="email"
          class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Změnit email"
        />
        <input
          v-model="buttons.password"
          type="password"
          class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Změnit heslo"
        />
      </div>

      <div class="flex justify-center mt-8">
        <button
          @click="saveChanges"
          class="font-bold py-2 px-8 text-slate-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {{ t('account.saveChanges') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AccountButtons } from '~/types'

const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.pageTitle')) })

const buttons = ref<AccountButtons>({
  username: 'ahoj',
  email: 'llll@example.com',
  password: '...',
})

const saveChanges = () => {
  console.log('Změny byly uloženy:', buttons.value)
}
</script>
