<template>
<<<<<<< HEAD
  <footer class="text-white p-8 z-10 relative bottom-0 w-full shdw">
=======
  <footer
    class="text-white p-8 z-10 background relative bottom-0 w-full border-t border-custom shadow-custom"
  >
>>>>>>> 8d348ca85c348cda6304257ea33cd71f2b13d23c
    <div
      class="cont grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 text-center sm:text-left"
    >
      <div>
        <h3 class="text-lg font-semibold mb-4">LibroFlare</h3>
        <p class="text-sm text-justify mb-4">{{ t('footer.description') }}</p>
        <LangSwitcher />
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">
          {{ t('footer.importantLinks') }}
        </h3>
        <ul class="flex flex-col gap-2">
          <li v-for="(link, key) in footerLinks" :key="key">
            <NuxtLink
              :href="link.href"
              class="hover:text-gray-300 transition-colors duration-200"
            >
              {{ t(link.name) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">
          {{ t('footer.newsletter.title') }}
        </h3>
        <p class="text-sm mb-4 text-justify">
          {{ t('footer.newsletter.description') }}
        </p>
        <input
          type="email"
          :placeholder="t('footer.newsletter.emailPlaceholder')"
          class="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-white transition-all"
        />
        <button
          class="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition"
        >
          {{ t('footer.newsletter.subscribeButton') }}
        </button>
      </div>
      <div
        class="col-span-3 border-t mt-8 pt-4 text-center text-sm border-custom"
      >
        <div class="flex justify-center gap-4 mb-4">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.href"
            class="hover:text-gray-300 transition-colors"
          >
            <Icon :name="social.icon" />
          </a>
        </div>
        &copy; 2024 {{ t('global.name') }}. {{ t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { MenuLink } from '~/types'

const { t } = useI18n()

const footerLinks: MenuLink[] = [
  { name: 'footer.links.contacts', href: '' },
  { name: 'footer.links.faq', href: '/faq' },
]
const socialLinks = [
  { icon: 'hugeicons:instagram', href: '' },
  { icon: 'hugeicons:new-twitter', href: '' },
  { icon: 'hugeicons:github', href: '' },
]
</script>
