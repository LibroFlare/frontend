import { defineStore } from 'pinia'
import {
  getMediaByKey as getGutendexMediaByKey,
  searchMedia as searchGutendex,
} from '~/providers/gutendex'
import {
  getMediaByKey as getLibrivoxMediaByKey,
  searchMedia as searchLibrivox,
} from '~/providers/librivox'
import {
  getMediaByKey as getOpenlibraryMediaByKey,
  searchMedia as searchOpenlibrary,
} from '~/providers/openlibrary'
import {
  getMediaByKey as getStandardebooksMediaByKey,
  searchMedia as searchStandardebooks,
} from '~/providers/standardebooks'
import type { Media } from '~/types'

export const useMediaStore = defineStore('media', () => {
  const { provider: storedProvider } = toRefs(usePreferencesStore())

  const media = ref<Media[] | null>()

  const searchMedia = async (
    search: string,
    limit?: number,
    provider?: Providers,
  ) => {
    const prvdr = provider || storedProvider.value

    if (prvdr === Providers.GUTENDEX) {
      return await searchGutendex(search)
    } else if (prvdr === Providers.STANDARD_EBOOKS) {
      return await searchStandardebooks({ query: search })
    } else if (prvdr === Providers.LIBRIVOX) {
      return await searchLibrivox({ q: search })
    } else return await searchOpenlibrary(search, limit)
  }

  const findMedia = async (key: Media['key'], provider?: Providers) => {
    const prvdr = provider || storedProvider.value

    if (prvdr === Providers.GUTENDEX) {
      return await getGutendexMediaByKey(key)
    } else if (prvdr === Providers.STANDARD_EBOOKS) {
      return await getStandardebooksMediaByKey(key)
    } else if (prvdr === Providers.LIBRIVOX) {
      return await getLibrivoxMediaByKey({ key })
    } else return await getOpenlibraryMediaByKey(key)
  }

  return { media, searchMedia, findMedia }
})
