import type { Media, MediaMeta } from '~/types'
import { NotFoundError } from '~/utils/errors'

const { id: provider, url } = ProvidersData.gutendex

type MIMEType = string

interface Format {
  [key: MIMEType]: string
}

interface Person {
  birth_year: number | null
  death_year: number | null
  name: string
}

interface Book {
  id: number
  title: string
  subjects: string[]
  authors: Person[]
  translators: Person[]
  bookshelves: string[]
  languages: string[]
  copyright: boolean | null
  media_type: 'Text' | 'Sound'
  formats: Format
  download_count: number
}

interface Search {
  count: number
  next: string | null
  previous: string | null
  results: Book[]
}

const getCoverUrl = (formats: Book['formats']): MediaMeta['cover'] => {
  return Object.entries(formats).find(
    ([key, value]) => key.includes('image/') && value,
  )?.[1]
}

const formatMedia = (media: Book[]) => {
  return media.map(({ id: numId, title, authors, media_type, formats }) => {
    const key: Media['key'] = numId.toString()
    const type: MediaMeta['type'] =
      media_type === 'Sound' ? MediaTypes.AUDIO_BOOK : MediaTypes.BOOK

    return {
      key,
      provider,
      meta: {
        title,
        slug: `/media/${provider}/${key}-${title}`,
        author: authors?.[0].name || 'unknown',
        type,
        cover: getCoverUrl(formats),
      },
    } as Media
  })
}

export const searchMedia = async (search: string) => {
  const { data } = await useFetch<Search>('/books/', {
    baseURL: url,
    query: {
      search,
    },
  })

  if (!data.value) throw new NotFoundError('Searched media not found...')

  return formatMedia(data.value.results)
}

export const getMediaByKey = async (key: Media['key']) => {
  const { data } = await useFetch<Book>(`/books/${key}/`, {
    baseURL: url,
  })

  if (!data.value) throw new NotFoundError('Searched media not found...')

  return formatMedia([data.value])[0]
}
