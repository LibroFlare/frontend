<template>
  <VueFrag>
    <div v-if="!search && !typing" class="w-full flex flex-col gap-16 mt-8">
      <LibraryReadings />
      <LibraryBookmarks />
    </div>
    <div v-else-if="typing || pending" class="flex flex-col gap-8">
      <MediaGrid :skeleton="true" />
      {{ $t('home.search.loading') }}
    </div>
    <template v-else-if="media && media.length > 0">
      <MediaGrid :media />
      <p>{{ $t('home.search.allResults') }}</p>
    </template>
    <p v-else>{{ $t('home.search.noResults') }}</p>
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
