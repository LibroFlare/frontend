<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <form action="" method="post" class="relative w-full max-w-lg">
      <input
        id="search"
        ref="searchInput"
        v-model="search"
        name="search"
        type="text"
        placeholder="Search for books, comics, manga..."
        required
        class="w-full py-3 pl-10 pr-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300 placeholder-gray-400"
        @focus="isFocused = true"
        @blur="onBlur"
      />
      <label
        for="search"
        class="absolute left-3 top-1/2 transform -translate-y-1/2"
      >
        <Icon
          name="feather:search"
          class="text-gray-400 size-5 transition-transform duration-300 hover:scale-110"
        />
      </label>
    </form>
    <div class="flex gap-2">
      <b> Hledaný výraz:</b>
      <p>{{ search }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const slug = ref<string>((route.params.slug as string) || '')
const search = ref<string>(slug.value)
const searchInput = ref<HTMLInputElement>()
const isFocused = ref<boolean>(false)

watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug as string
    search.value = slug.value
  },
)

function onBlur() {
  isFocused.value = false
  nextTick(() => {
    if (search.value.length === 0) return navigateTo('/')
    router.replace({
      path: `/browse/${encodeURIComponent(search.value)}`,
    })
  })
}

watch(isFocused, (focused) => {
  if (focused) nextTick(() => searchInput.value?.focus())
})
</script>

<style scoped></style>
