import { load } from 'cheerio'
import type { Media } from '~/types'

const { id: provider, url: baseURL } = ProvidersData.standard_ebooks

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
  view = 'grid',
}: {
  query?: string
  perPage?: 12 | 24 | 48
  sort?: 'newest' | 'author-alpha' | 'reading-ease' | 'length'
  tags?: standardebooksTags
  view?: 'grid' | 'list'
}) => {
  const data = await $fetch<string>('/ebooks', {
    query: { query, sort, view, 'per-page': perPage, 'tags[]': tags },
    baseURL,
  })

  if (!data) throw new NotFoundError('Searched media not found...')

  const $ = load(data)

  const items: Media[] = $('.ebooks-list li')
    .toArray()
    .map((element) => {
      const el = $(element)

      let key = el.find('p:not([class]) a[href]').first().attr('href')
      key = key?.startsWith('https://') ? key : baseURL + key
      const title = el.find('p:not([class]) a[href] span').first().text().trim()
      const author = el.find('p.author a[href] span').first().text().trim()
      let cover = el
        .find('.thumbnail-container picture img')
        .first()
        .attr('src')
      cover = cover?.startsWith('https://') ? cover : baseURL + cover

      return {
        key,
        provider,
        meta: {
          title,
          author,
          slug: `${author}-${title}`,
          cover,
          type: MediaTypes.BOOK,
        },
      }
    })

  return items
}
