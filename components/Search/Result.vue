<template>
  <VueFrag>
    <p v-if="!search">Search some media first.</p>
    <p v-else-if="typing || pending">Searching ...</p>
    <div
      v-else-if="media && media.length > 0"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
    >
      <MediaCard v-for="(meta, key) in media" :key="key" :meta="meta" />
    </div>
    <p v-else>No results found.</p>
  </VueFrag>
</template>

<script lang="ts" setup>
import { searchMedia } from '~/providers/openlibrary'

const { search, typing } = toRefs(useSearchStore())
const { media } = toRefs(useMediaStore())

const pending = ref<boolean>(false)

const fetchMedia = async () => {
  if (typing.value || !search.value?.length) return (media.value = [])

  pending.value = true
  media.value = (await searchMedia(search.value)) || []
  pending.value = false
}

if (!media.value) await fetchMedia()
watch([search, typing], async () => fetchMedia())
</script>

<style lang="scss" scoped></style>
