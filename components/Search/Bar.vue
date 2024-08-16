<template>
  <div class="flex flex-col items-center justify-center px-4">
    <div class="relative w-full">
      <input
        id="search"
        ref="searchInput"
        v-model="search"
        name="search"
        type="text"
        placeholder="Search for books, comics, manga..."
        required
        class="w-full py-3 pl-10 pr-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300 placeholder-gray-400"
        @blur="onBlur"
      />
      <label
        for="search"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <Icon
          name="feather:search"
          class="text-gray-400 size-5 transition-transform duration-300 hover:scale-110"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const { setSearch, setTyping } = useSearchStore()
const { search: storedSearch } = toRefs(useSearchStore())
const route = useRoute()
const router = useRouter()

const slug = ref<string>((route.params.slug as string) || '')

const searchInput = ref<HTMLInputElement>()
const search = ref<string>(slug.value)
if (search.value) setSearch(search.value)

// watch typing
watch(
  search,
  () => {
    if (search.value.length > 0) return setTyping(true)

    setSearch('')
    setTyping(false)
  },
  { immediate: true },
)

// set search to store
debouncedWatch(
  search,
  () => {
    if (search.value !== storedSearch.value) setSearch(search.value)
    setTyping(false)
  },
  { debounce: 1000 },
)

// replace route on blur
const onBlur = () => {
  if (search.value.length === 0) return navigateTo('/')

  router.replace({
    path: `/browse/${encodeURIComponent(search.value)}`,
  })
}
</script>

<style scoped></style>
