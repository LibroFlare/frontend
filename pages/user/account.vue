<template>
  <div class="bg-gray-900 text-white flex flex-col items-center mr-12 py-12">
    <div class="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-12">
      <div class="flex items-center gap-6 mb-8">
        <div class="flex-shrink-0">
          <NuxtImg
            src="/logo.png"
            alt="Profile Image"
            class="w-24 h-24 rounded-full cursor-pointer"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold mb-2">{{ t('account.pageTitle') }}</h1>
          <p class="text-lg mb-2">
            {{ t('account.email') }}: {{ buttons.email }}
          </p>
          <p class="text-lg mb-2">{{ t('account.password') }}: ●●●●●●●●</p>
          <p class="text-lg mb-2">
            {{ t('account.username') }}: {{ buttons.username }}
          </p>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="bg-slate-400 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ t('account.saveChanges') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { AccountButtons } from '~/types'

const { t } = useI18n()

const buttons: AccountButtons = {
  username: 'ahoj',
  email: 'llll',
  password: '...',
}
</script>

<style scoped></style>
