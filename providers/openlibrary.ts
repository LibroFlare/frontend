import type { Media } from '~/types'
import { NotFoundError } from '~/utils/errors'

const { id: source, url: baseURL } = ProvidersData.openlibrary

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

interface Work {
  key: string
  title: string
  subtitle?: string
  translated_titles?: { language: string; text: string }[]
  authors?: {
    type: { key: string }
    author: { key: string }
  }[]
  first_publish_date: number
  covers: number[]
  description?: string
  subjects?: string[]
  subject_places?: string[]
  subject_people?: string[]
  subject_times?: string[]
  original_languages?: string[]
  location?: string
  type: { key: string }
  latest_revision?: number
  revision?: number
}

interface Author {
  key: string
  name: string
  personal_name: string
  title?: string
  links?: {
    title: string
    url: string
    type: { key: string }
  }[]
  bio?: string
  type?: { key: string }
  alternate_names?: string[]
  photos?: number[]
  wikipedia?: string
  entity_type?: 'person'
  birth_date?: string
  death_date?: string
  source_records?: string[]
  fuller_name?: string
  remote_ids?: {
    viaf?: string
    goodreads?: string
    storygraph?: string
    isni?: string
    librarything?: string
    amazon?: string
    wikidata?: string
  }
  latest_revision?: number
  revision?: number
}

const fields = 'key,title,author_name,first_publish_year,cover_i'

const getCoverUrl = (id: number, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`
}

const formatMedia = (media: Doc[]) => {
  return media.map((media) => {
    const key = media.key.includes('/works/')
      ? media.key.replace('/works/', '')
      : media.key
    const title = media.title

    return {
      key,
      source,
      meta: {
        title,
        slug: `/media/${key}-${title}`,
        author: media.author_name?.[0] || 'unknown',
        type: MediaTypes.BOOK,
        year: media.first_publish_year,
        cover: media.cover_i ? getCoverUrl(media.cover_i) : undefined,
      },
    } as Media
  })
}

export const searchMedia = async (query: string, limit: number = 20) => {
  const { data } = await useFetch<Search>('/search.json', {
    baseURL,
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
    baseURL,
    query: {
      fields,
      sort: 'random',
      limit,
    },
  })

  if (!data.value) throw new NotFoundError('Trending media not found...')

  return formatMedia(data.value.works)
}

export const getMediaByKey = async (key: string) => {
  const { data } = await useFetch<Work>(`/works/${key}.json`, { baseURL })

  if (!data.value) throw new NotFoundError('Media not found...')

  const author = ref<Author>()
  if (data.value.authors?.[0].author.key) {
    author.value = await getAuthorByKey(data.value.authors[0].author.key)
  }

  if (!author) throw new NotFoundError('Media not found...')

  return formatMedia([
    {
      key: data.value.key,
      title: data.value.title,
      author_name: [author.value?.name || 'unknown'],
      first_publish_year: data.value.first_publish_date,
      cover_i: data.value.covers[0],
    },
  ])
}

export const getAuthorByKey = async (key: string) => {
  const { data } = await useFetch<Author>(`/authors/${key}.json`, { baseURL })

  if (!data.value) throw new NotFoundError('Author not found...')

  return data.value
}
