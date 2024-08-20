<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1
      class="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      {{ t('contacts.pageTitle') }}
    </h1>
    <p
      class="text-lg text-center text-gray-700 dark:text-gray-300 mb-8 transition-colors duration-300"
    >
      {{ t('contacts.description') }}
    </p>
    <div class="space-y-6">
      <div
        class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
      >
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 flex items-center gap-2"
        >
          {{ t('contacts.email') }}
          <Icon
            name="mdi:email-outline"
            class="text-gray-600 dark:text-gray-400"
          />
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          <a
            :href="'mailto:support@libroflare.com'"
            class="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
          >
            support.libroflare@gmail.com
          </a>
        </p>
      </div>
      <div
        class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
      >
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 flex items-center gap-2"
        >
          {{ t('contacts.socialMedia') }}
          <Icon
            name="mdi:account-group-outline"
            class="text-gray-600 dark:text-gray-400"
          />
        </h2>
        <div class="flex flex-col gap-2">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.href"
            class="flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
            target="_blank"
          >
            <Icon
              :name="social.icon"
              class="mr-2 text-xl transition-transform duration-300 hover:scale-125"
            />
            {{ social.name }}
          </a>
        </div>
      </div>
      <div
        class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
      >
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 flex items-center gap-2"
        >
          {{ t('contacts.address') }}
          <Icon
            name="mdi:map-marker-outline"
            class="text-gray-600 dark:text-gray-400"
          />
        </h2>
        <p class="text-gray-700 dark:text-gray-300">hhhhhhh</p>
      </div>
      <div
        class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
      >
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 flex items-center gap-2"
        >
          {{ t('contacts.phone') }}
          <Icon
            name="mdi:phone-outline"
            class="text-gray-600 dark:text-gray-400"
          />
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          <a
            :href="'tel:+1234567890'"
            class="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
          >
            +420 xxxxxxx
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socialLinks = [
  {
    icon: 'hugeicons:instagram',
    href: 'https://instagram.com/libroflare',
    name: 'LibroFlare Instagram',
  },
  {
    icon: 'hugeicons:new-twitter',
    href: 'https://twitter.com/libroflare',
    name: 'LibroFlare on X',
  },
  {
    icon: 'hugeicons:github',
    href: 'https://github.com/libroflare',
    name: 'LibroFlare GitHub',
  },
]
</script>

<style scoped>
.bg-gray-100,
.bg-gray-900 {
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.bg-gray-100:hover {
  background-color: rgba(220, 220, 220, 0.8);
}

.bg-gray-900:hover {
  background-color: rgba(50, 50, 50, 0.8);
}
</style>
