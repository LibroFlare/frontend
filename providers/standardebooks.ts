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

      const title = el.find('p:not([class]) a span').first().text().trim()
      const author = el.find('p.author a span').first().text().trim()
      let key = el.find('p:not([class]) a').first().attr('href')
      key =
        (key?.startsWith('/ebooks/') ? key.replace('/ebooks/', '') : key) ||
        `${title}/${author}`
      key = key.replace(/-/g, '%2D').replace(/\//g, '%2F')
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
          slug: `/media/${provider}/${key}-${title}`,
          cover,
          type: MediaTypes.BOOK,
        },
      }
    })

  return items
}

export const getMediaByKey = async (key: Media['key']): Promise<Media> => {
  const data = await $fetch<string>(`/ebooks/${key}`, { baseURL })

  if (!data) throw new NotFoundError('Media not found...')

  const $ = load(data)

  const title = $('header hgroup h1').first().text().trim()
  const author = $('header hgroup h2 a span').first().text().trim()
  let cover = $('.downloads-container figure picture img[src]')
    .first()
    .attr('src')
  cover = cover?.startsWith('https://') ? cover : baseURL + cover
  let description: string = ''
  $('#description p')
    .toArray()
    .forEach((el) => (description += $(el).text().trim()))

  const sources: Media['meta']['sources'] = $(
    '#download ul li span:nth-child(1) a[href]',
  )
    .toArray()
    .map((el) => {
      let href = $(el).attr('href')
      href = href?.startsWith('https://') ? href : baseURL + href

      return {
        href,
        type: $(el).text().trim(),
      }
    })

  return {
    key,
    provider,
    meta: {
      title,
      author,
      slug: `/media/${provider}/${key}-${title}`,
      type: MediaTypes.BOOK,
      cover,
      description,
      sources,
    },
  }
}
