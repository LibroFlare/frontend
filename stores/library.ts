import { defineStore } from 'pinia'
import type { Media } from '~/types'

export const useLibraryStore = defineStore(
  'library',
  () => {
    // bookmarks
    const bookmarks = ref<Media[]>([])

    const isBookmarked = (key: Media['key']) =>
      bookmarks.value.some((item) => item.key === key)

    const toggleBookmark = (media: Media) => {
      const index = bookmarks.value.findIndex((item) => item.key === media.key)

      if (isBookmarked(media.key) && index !== -1) {
        bookmarks.value.splice(index, 1)
      } else bookmarks.value.push(media)
    }

    // continue reading ...
    const readings = ref<Media[]>([])

    return {
      bookmarks,
      isBookmarked,
      toggleBookmark,
      readings,
    }
  },
  { persist: true },
)
