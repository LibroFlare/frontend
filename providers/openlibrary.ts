import type { MediaMeta } from '~/types'

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

const getCoverUrl = (id: number, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`
}

export const searchMedia = async (query: string, limit: number = 20) => {
  const { data } = await useFetch<Search>('/search.json', {
    baseURL: url,
    query: {
      q: query,
      fields: 'key,title,author_name,first_publish_year,cover_i',
      limit,
    },
  })

  return data.value?.docs.map((media) => {
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
