<template>
  <header class="shdw fixed top-0 w-full py-4 backdrop-blur-md z-50">
    <nav class="cont flex items-center justify-between px-6">
      <ul class="flex-1 flex justify-around items-center gap-4 relative">
        <li
          v-for="(link, key) in headerLinks.slice(0, 2)"
          :key="key"
          class="hidden sm:flex items-center"
        >
          <MenuLink :link="link" scale />
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
          v-for="(link, key) in headerLinks.slice(2, 4)"
          :key="key"
          class="hidden sm:flex items-center"
        >
          <MenuLink :link="link" scale />
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
        <li v-for="(link, key) in headerLinks" :key="key">
          <MenuLink :link="link" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import type { MenuLink } from '~/types'

const { t } = useI18n()

const menuToggle = ref(false)

const headerLinks = computed<MenuLink[]>(() => [
  {
    name: t('global.pages.discover'),
    href: '/discover',
    icon: 'iconamoon:discover-bold',
  },
  {
    name: t('global.pages.library'),
    href: '/library',
    icon: 'streamline:interface-content-book-2-library-content-books-book-shelf-stack',
  },
  {
    name: t('global.pages.account'),
    href: '/account',
    icon: 'material-symbols:account-circle-full',
  },
  {
    name: t('global.pages.settings'),
    href: '/settings',
    icon: 'material-symbols:settings',
  },
])
</script>
