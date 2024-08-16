import type { MediaMeta } from '~/types'

const url = 'https://openlibrary.org'

interface Doc {
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

export const searchMedia = async (query: string) => {
  const { data, status } = await useFetch<Search>('/search.json', {
    baseURL: url,
    query: {
      q: query,
      fields: 'title,author_name,first_publish_year,cover_i',
      limit: 10,
    },
  })

  return {
    status: status.value,
    data: data.value?.docs.map((media) => {
      return {
        id: 1,
        author: media.author_name[0],
        title: media.title,
        type: 'book',
        year: media.first_publish_year,
        image: getCoverUrl(media.cover_i),
      } as MediaMeta
    }),
  }
}

const getCoverUrl = (id: number, size: 'S' | 'M' | 'L' = 'M') => {
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`
}
