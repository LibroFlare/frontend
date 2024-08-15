<template>
  <header class="fixed top-0 w-full text-white py-4 backdrop-blur-md bg-opacity-75 shadow-lg z-50">
    <div class="container mx-auto flex justify-between items-center px-6">
      
      <div class="flex-1 flex justify-center items-stretch relative">
        <nav class="hidden sm:flex space-x-4 items-center mr-4">
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="3.5" height="13" x=".55" y=".5" rx=".5"></rect><rect width="3.5" height="11" x="4.05" y="2.5" rx=".5"></rect><rect width="3" height="11" x="9.26" y="2.3" rx=".5" transform="rotate(-14.05 10.779 7.795)"></rect><path d="M.55 10h3.5m0-1h3.5m2.5 2l2.88-.72"></path></g></svg>
            </span> My Library
          </a>
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19 23.3l-.6-.5c-2-1.9-3.4-3.1-3.4-4.6c0-1.2 1-2.2 2.2-2.2c.7 0 1.4.3 1.8.8c.4-.5 1.1-.8 1.8-.8c1.2 0 2.2.9 2.2 2.2c0 1.5-1.4 2.7-3.4 4.6zM18 2c1.1 0 2 .9 2 2v9.08L19 13l-1 .08V4h-5v8l-2.5-2.25L8 12V4H6v16h7.08c.12.72.37 1.39.72 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"></path></svg>
            </span> Wishlist
          </a>
        </nav>

        <div class="text-2xl font-bold text-center hover:scale-110 transform transition duration-300 ease-in-out mx-5">
          LibroFlare
        </div>

        <nav class="hidden sm:flex space-x-4 items-center ml-4">
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.325 0 2.5-.387t2.15-1.113q-.975-.725-2.15-1.112T12 17t-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20m0-9q.65 0 1.075-.425T13.5 9.5t-.425-1.075T12 8t-1.075.425T10.5 9.5t.425 1.075T12 11m0 7.5"></path>
              </svg>
            </span> My Account
          </a>
          <a href="#" class="hover:text-gray-300 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110">
            <span class="mr-2 text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19 1l-5 5v11l5-4.5zm2 4v13.5c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6c-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5c.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.3 4.75 1.05c.1.05.15.05.25.05c.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1M10 18.41C8.75 18.09 7.5 18 6.5 18c-1.06 0-2.32.19-3.5.5V7.13c.91-.4 2.14-.63 3.5-.63s2.59.23 3.5.63z"></path></svg>
          </span> Continue Reading
          </a>
        </nav>
      </div>
      <div class="sm:hidden">
        <button @click="toggleMenu" class="text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="menuOpen" class="sm:hidden bg-transparent bg-opacity-95 py-4 px-6 space-y-4 flex-col grid-cols-subgrid">
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        My Library
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        Wishlist
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        My Account
      </a>
      <a href="#" class="block hover:text-gray-300 transition-transform transform hover:scale-110">
        Continue Reading
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<style scoped>
</style>
