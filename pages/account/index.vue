<template>
  <VueFrag>
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
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold mb-2">
              {{ t('account.pageTitle') }}
            </h1>
            <p class="text-lg mb-2 border-b border-gray-600 pb-2">
              {{ t('account.credentials.username') }}:
              <span class="font-semibold">{{ user?.username }}</span>
            </p>
            <p class="text-lg mb-2 border-b border-gray-600 pb-2">
              {{ t('account.credentials.email') }}:
              <span class="font-semibold">{{ user?.email }}</span>
            </p>
            <p class="text-lg mb-2">
              {{ t('account.password') }}:
              <span class="font-semibold">{{ '●●●●●●●●' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <button
      class="mt-8 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
      @click="signOut"
    >
      {{ t('account.signOut') }}
    </button>
  </VueFrag>
</template>

<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.pageTitle')) })

const { user } = toRefs(useUserStore())
const { signOut } = useUserStore()
</script>

<style scoped lang="scss">
.tab {
  @apply cursor-pointer py-2 px-4 rounded-lg text-gray-600 hover:text-gray-800 transition-colors;
}

.tab-active {
  @apply bg-gray-800 text-white;
}
</style>
