import { defineStore } from 'pinia'
import type { MediaMeta } from '~/types'

export const useMediaStore = defineStore('media', () => {
  const media = ref<MediaMeta[]>()

  return { media }
})
