import { defineStore } from 'pinia'
import { searchMedia as searchGutendex } from '~/providers/gutendex'
import { searchMedia as searchOpenlibrary } from '~/providers/openlibrary'
import type { Media } from '~/types'

export const useMediaStore = defineStore('media', () => {
  const { provider } = toRefs(usePreferencesStore())

  const media = ref<Media[] | null>()

  const searchMedia = async (search: string) => {
    if (provider.value === ProviderSources.GUTENDEX)
      return await searchGutendex(search)
    else return await searchOpenlibrary(search)
  }

  return { media, searchMedia }
})
