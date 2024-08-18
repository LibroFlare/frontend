import type { MediaMeta } from '~/types'
import { NotFoundError } from '~/utils/errors'

const url = 'https://openlibrary.org'

interface Doc {
  key: string
  author_name: string[]
  title: string
  first_publish_year: number
  cover_i: number
}

interface Search {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: Doc[]
  num_found: number
  q: string
  offset?: number
}

interface Trending {
  query: string
  works: Doc[]
  days: number
  hours: number
}

const fields = 'key,title,author_name,first_publish_year,cover_i'

const getCoverUrl = (id: number, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`
}

const formatMedia = (media: Doc[]) => {
  return media.map((media) => {
    const id = media.key.includes('/works/')
      ? media.key.replace('/works/', '')
      : media.key
    const title = media.title

    return {
      id,
      title,
      slug: `/media/${id}-${title}`,
      author: media.author_name[0],
      type: 'book',
      year: media.first_publish_year,
      cover: getCoverUrl(media.cover_i),
    } as MediaMeta
  })
}

export const searchMedia = async (query: string, limit: number = 20) => {
  const { data } = await useFetch<Search>('/search.json', {
    baseURL: url,
    query: {
      q: query,
      fields,
      limit,
    },
  })

  if (!data.value) throw new NotFoundError('Searched media not found...')

  return formatMedia(data.value.docs)
}

export const getTrendingMedia = async (limit: number = 20) => {
  const { data } = await useFetch<Trending>('/trending.json', {
    baseURL: url,
    query: {
      fields,
      sort: 'random',
      limit,
    },
  })

  if (!data.value) throw new NotFoundError('Trending media not found...')

  return formatMedia(data.value.works)
}
