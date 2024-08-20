<template>
  <Transition name="slide-down">
    <div
      v-if="showMessage"
      :key="isOnline.toString()"
      class="fixed top-0 w-full p-0.5 flex items-center justify-center gap-2 text-sm z-[999]"
      :class="isOnline ? 'bg-green-500' : 'bg-red-500'"
    >
      <Icon name="ph:seal-warning-fill" class="size-6" />
      <p>
        {{
          isOnline ? "You're back online!" : 'Oops! No internet connection...'
        }}
      </p>
      <button
        class="absolute right-2 flex items-center justify-center bg-transparent hover:text-black/60 transition-colors"
        title="Hide"
        @click="showMessage = false"
      >
        <Icon name="radix-icons:cross-2" class="size-6" />
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { isOnline } = useNetwork()
const showMessage = ref<boolean>(false)
let timeout: NodeJS.Timeout | null = null

watch(
  isOnline,
  () => {
    showMessage.value = true

    if (isOnline.value)
      timeout = setTimeout(() => (showMessage.value = !isOnline.value), 3000)

    if (timeout && !isOnline.value) clearInterval(timeout)
  },
  { immediate: !isOnline.value },
)
</script>

<style scoped>
.slide-down-enter-active {
  transition: transform 0.5s ease-out;
}

.slide-down-leave-active {
  transition: transform 0.5s ease-in;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
