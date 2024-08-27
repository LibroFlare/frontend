<template>
  <div class="flex flex-col items-center justify-center px-4">
    <div class="relative w-full">
      <input
        id="search"
        v-model="search"
        name="search"
        type="text"
        :placeholder="$t('home.search.placeholder')"
        required
        autocomplete="off"
        class="shdw w-full py-3 pl-10 pr-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300 placeholder-gray-400"
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
const { search } = toRefs(useSearchStore())
const route = useRoute()
const router = useRouter()

// keep synced search w slug
watchEffect(() => setSearch((route.params.slug as string) || ''))

// set typing based on search
watch(search, () => setTyping(search.value.length > 0), { immediate: false })

// set route by search
debouncedWatch(
  search,
  async () => {
    setTyping(false)

    await router.replace({
      path:
        search.value.length === 0
          ? `/`
          : `/browse/${encodeURIComponent(search.value)}`,
    })
  },
  { debounce: 1000 },
)
</script>

<style scoped></style>
