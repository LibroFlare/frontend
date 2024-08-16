<template>
  <VueFrag>
    {{ search }}
    <p v-if="!search">`(-:-_-:-)~ &nbsp; \{˘°°˘}˛</p>
    <p v-else-if="typing || pending">{{ $t('home.search.loading') }}</p>
    <template v-else-if="media && media.length > 0">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <MediaCard v-for="(meta, key) in media" :key="key" :meta="meta" />
      </div>
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
