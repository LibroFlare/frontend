import { load } from 'cheerio'

const baseURL = 'https://standardebooks.org'

export type standardebooksTags =
  | 'all'
  | 'adventure'
  | 'autobiography'
  | 'biography'
  | 'childrens'
  | 'comedy'
  | 'drama'
  | 'fantasy'
  | 'fiction'
  | 'horror'
  | 'memoir'
  | 'mystery'
  | 'nonfiction'
  | 'philosophy'
  | 'poetry'
  | 'satire'
  | 'science-fiction'
  | 'shorts'
  | 'spirituality'
  | 'travel'

export const searchMedia = async ({
  query,
  sort = 'newest',
  perPage = 24,
  tags,
}: {
  query?: string
  perPage?: 12 | 24 | 48
  sort?: 'newest' | 'author-alpha' | 'reading-ease' | 'length'
  tags?: standardebooksTags
}) => {
  const data = await $fetch<string>('/ebooks', {
    query: { query, sort, 'per-page': perPage, 'tags[]': tags },
    baseURL,
  })

  if (!data) throw new NotFoundError('Searched media not found...')

  const $ = load(data)
}
