import { defineStore } from 'pinia'
import type { MediaMeta } from '~/types'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites:
      typeof window !== 'undefined' && localStorage.getItem('favorites')
        ? (JSON.parse(localStorage.getItem('favorites') || '[]') as MediaMeta[])
        : [],
  }),
  getters: {
    isFavorite: (state) => (id: string) => {
      return state.favorites.some((item) => item.id === id)
    },
  },
  actions: {
    toggleFavorite(media: MediaMeta) {
      const index = this.favorites.findIndex((item) => item.id === media.id)
      if (index === -1) {
        this.favorites.push(media)
      } else {
        this.favorites.splice(index, 1)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    },
  },
})
