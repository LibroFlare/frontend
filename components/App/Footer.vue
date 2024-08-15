<template>
  <footer
    class="bg-gray-900 text-white py-8 z-10 absolute bottom-0 w-full bg-transparent"
  >
    <div
      class="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left"
    >
      <div>
        <h3 class="text-lg font-semibold mb-4">LibroFlare</h3>
        <p class="text-sm text-justify">
          LibroFlare is your own space to get lost in thousands of books, manga,
          comics and other reading materials.
        </p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Important links</h3>
        <ul class="flex flex-col gap-2">
          <li v-for="(link, key) in links" :key="key">
            <NuxtLink :href="link.href" class="hover:text-gray-300 transition">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
        <p class="text-sm mb-4 text-justify">
          Don't let any new books fly past you, subscribe to our newsletter to
          find out about all sorts of new books on sale!
        </p>
        <input
          type="email"
          placeholder="Your email"
          class="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-white transition-all"
        />
        <button
          class="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition"
        >
          Subscribe
        </button>
      </div>
      <div
        class="col-span-3 border-t border-gray-700 mt-8 pt-4 text-center text-sm"
      >
        &copy; 2024 LibroFlare. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { MenuLink } from '~/types'

const links: MenuLink[] = [
  {
    name: 'Home',
    href: '',
  },
  {
    name: 'My Library',
    href: '',
  },
  {
    name: 'Wishlist',
    href: '',
  },
  {
    name: 'Contacts',
    href: '',
  },
  {
    name: 'FAQ',
    href: '',
  },
]
</script>
