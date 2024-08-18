import { defineStore } from 'pinia'
import type { MediaMeta } from '~/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<MediaMeta[]>([])

  const isFavorite = (id: MediaMeta['id']) =>
    favorites.value.some((item) => item.id === id)

  const toggleFavorite = (media: MediaMeta) => {
    const index = favorites.value.findIndex((item) => item.id === media.id)

    if (isFavorite(media.id)) {
      favorites.value.splice(index, 1)
    } else favorites.value.push(media)
  }

  return { favorites, isFavorite, toggleFavorite }
})
