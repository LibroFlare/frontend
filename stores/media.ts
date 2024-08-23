import { defineStore } from 'pinia'
import type { Media } from '~/types'

export const useMediaStore = defineStore('media', () => {
  const media = ref<Media[]>()

  return { media }
})
