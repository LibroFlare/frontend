import { defineStore } from 'pinia'
import type { MediaMeta } from '~/types'

export const useLibraryStore = defineStore('library', () => {
  // bookmarks
  const bookmarks = ref<MediaMeta[]>([])

  const isBookmarked = (id: MediaMeta['id']) =>
    bookmarks.value.some((item) => item.id === id)

  const toggleBookmark = (media: MediaMeta) => {
    const index = bookmarks.value.findIndex((item) => item.id === media.id)

    if (isBookmarked(media.id)) {
      bookmarks.value.splice(index, 1)
    } else bookmarks.value.push(media)
  }

  // continue reading ...
  const readings = ref<MediaMeta[]>([])

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    readings,
  }
})
