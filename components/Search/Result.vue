<template>
  <VueFrag>
    <MediaFilter @filter-changed="(filter) => (selectedFilter = filter)" />
    <div v-if="!search && !typing" class="w-full flex flex-col gap-16 mt-8">
      <LibraryReadings />
      <LibraryBookmarks />
    </div>
    <div v-else-if="typing || status === 'pending'" class="flex flex-col gap-8">
      <MediaGrid :skeleton="true" />
      {{ $t('home.search.loading') }}
    </div>
    <template v-else-if="filteredMedia && filteredMedia.length > 0">
      <MediaGrid :medias="filteredMedia" />
      <p>{{ $t('home.search.allResults') }}</p>
    </template>
    <p v-else>{{ $t('home.search.noResults') }}</p>
  </VueFrag>
</template>

<script lang="ts" setup>
import { useMediaStore } from '~/stores/media'
import { useSearchStore } from '~/stores/search'

const { search, typing } = toRefs(useSearchStore())
const { media } = toRefs(useMediaStore())
const { searchMedia } = useMediaStore()

const { data, status, execute } = await useAsyncData(
  'media',
  async () => {
    if (typing.value || !search.value?.length) return (media.value = [])

    return searchMedia(search.value)
  },
  { lazy: true, immediate: false },
)

if (!media.value) await execute()
watch([search, typing], async () => await execute())

watchEffect(() => (media.value = data.value))

// filter
const selectedFilter = ref()

const filteredMedia = computed(() => {
  if (!media.value) return []
  if (!selectedFilter.value) return media.value

  return media.value.filter(({ meta }) => meta.type === selectedFilter.value)
})
</script>
