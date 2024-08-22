<template>
  <VueFrag>
    <MediaFilter @filter-changed="updateFilter" />
    <div v-if="!search && !typing" class="w-full flex flex-col gap-16 mt-8">
      <LibraryReadings />
      <LibraryBookmarks />
    </div>
    <div v-else-if="typing || pending" class="flex flex-col gap-8">
      <MediaGrid :skeleton="true" />
      {{ $t('home.search.loading') }}
    </div>
    <template v-else-if="filteredMedia && filteredMedia.length > 0">
      <MediaGrid :media="filteredMedia" />
      <p>{{ $t('home.search.allResults') }}</p>
    </template>
    <p v-else>{{ $t('home.search.noResults') }}</p>
  </VueFrag>
</template>

<script lang="ts" setup>
import { searchMedia } from '~/providers/openlibrary'
import { useMediaStore } from '~/stores/media'
import { useSearchStore } from '~/stores/search'

const { search, typing } = toRefs(useSearchStore())
const { media } = toRefs(useMediaStore())

const pending = ref<boolean>(false)
const selectedFilter = ref<string>('')

const updateFilter = (newFilter: string) => {
  selectedFilter.value = newFilter
}

const fetchMedia = async () => {
  if (typing.value || !search.value?.length) return (media.value = [])

  pending.value = true
  media.value = (await searchMedia(search.value)) || []
  pending.value = false
}

const filteredMedia = computed(() => {
  if (!selectedFilter.value) {
    return media.value
  }
  return media.value?.filter((item) => item.type === selectedFilter.value) || []
})

if (!media.value) await fetchMedia()
watch([search, typing], async () => fetchMedia())
</script>
