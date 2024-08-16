<template>
  <header
    class="fixed top-0 w-full py-4 text-white backdrop-blur-md shadow-lg z-50"
  >
    <nav class="cont flex items-center justify-between px-6">
      <ul class="flex-1 flex justify-around items-center gap-4 relative">
        <li
          v-for="(link, key) in links.slice(0, links.length / 2)"
          :key="key"
          class="hidden sm:flex items-center"
        >
          <MenuLink :link="link" :scale="true" />
        </li>
        <li class="relative flex justify-center items-center">
          <NuxtLink
            href="/"
            class="text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            <NuxtImg
              src="/logo.png"
              alt="Site Logo"
              class="h-8 w-auto -bottom-4 transform scale-125 hover:scale-150 transition-transform duration-300 z-10"
            />
          </NuxtLink>
        </li>
        <li
          v-for="(link, key) in links.slice(links.length / 2)"
          :key="key"
          class="hidden sm:flex items-center"
        >
          <MenuLink :link="link" :scale="true" />
        </li>
      </ul>
      <button
        class="sm:hidden flex items-center justify-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="menuToggle = !menuToggle"
      >
        <Icon v-if="!menuToggle" name="ci:hamburger" class="size-6" />
        <Icon v-else name="radix-icons:cross-2" class="size-6" />
      </button>
    </nav>

    <nav v-if="menuToggle" class="sm:hidden flex px-6 py-4">
      <ul class="flex flex-col gap-2.5">
        <li v-for="(link, key) in links" :key="key">
          <MenuLink :link="link" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import type { MenuLink } from '~/types'

const menuToggle = ref(false)

const links: MenuLink[] = [
  {
    name: 'My Library',
    href: '',
    icon: 'streamline:interface-content-book-2-library-content-books-book-shelf-stack',
  },
  {
    name: 'Wishlist',
    href: '',
    icon: 'mdi:book-heart-outline',
  },
  {
    name: 'My Account',
    href: '',
    icon: 'material-symbols:account-circle-full',
  },
  {
    name: 'Continue Reading',
    href: '',
    icon: 'mdi:book-open-page-variant-outline',
  },
]
</script>

<style scoped></style>
