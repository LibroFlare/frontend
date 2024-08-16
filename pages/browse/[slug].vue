<template>
  <main class="w-full h-screen grid place-items-center">
    <div class="flex flex-col">
      <h1>{{ slug }}</h1>
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        @focus="isFocused = true"
        @blur="onBlur"
      />
      {{ search }}
    </div>
  </main>
</template>

<script lang="ts" setup>
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
    router.replace({
      path: `/browse/${encodeURIComponent(search.value)}`,
    })
  })
}

watch(isFocused, (focused) => {
  if (focused) nextTick(() => searchInput.value?.focus())
})
</script>

<style lang="scss"></style>
