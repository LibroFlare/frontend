<template>
  <div class="cont-inner text-white flex flex-col items-center py-12">
    <div class="shdw w-full max-w-4xl rounded-lg p-12">
      <div class="flex items-center gap-6 mb-8">
        <div class="flex-shrink-0">
          <NuxtImg
            src="/logo.png"
            alt="Profile Image"
            class="w-24 h-24 rounded-full cursor-pointer border-2 border-gray-600"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold mb-2">{{ t('account.pageTitle') }}</h1>
          <p class="text-lg mb-2 border-b border-gray-700 pb-2">
            {{ t('account.email') }}: {{ buttons.email }}
          </p>
          <p class="text-lg mb-2 border-b border-gray-700 pb-2">
            {{ t('account.password') }}: ●●●●●●●●
          </p>
          <p class="text-lg mb-2">
            {{ t('account.username') }}: {{ buttons.username }}
          </p>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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

const buttons: AccountButtons = {
  username: 'ahoj',
  email: 'llll',
  password: '...',
}
</script>

<style scoped></style>
