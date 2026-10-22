import { load } from 'cheerio'
import { NotFoundError } from '~/utils/errors'
import type { Media } from '~~/types'

const { id: provider, url: baseURL } = ProvidersData.librivox

type Field =
  | 'id'
  | 'title'
  | 'description'
  | 'url_text_source'
  | 'language'
  | 'copyright_year'
  | 'num_sections'
  | 'url_rss'
  | 'url_zip_file'
  | 'url_project'
  | 'url_librivox'
  | 'url_iarchive'
  | 'url_other'
  | 'totaltime'
  | 'totaltimesecs'
  | 'authors'
  | 'sections'
  | 'genres'
  | 'translators'

interface Book {
  id: string
  title: string
  description: string
  url_text_source: string
  language: string
  copyright_year: string
  num_sections: string
  url_rss: string
  url_zip_file: string
  url_project: string
  url_librivox: string
  url_other: string
  totaltime: string
  totaltimesecs: number
  authors: Author[]
  url_iarchive: string
  sections: Section[]
  genres: {
    id: string
    name: string
  }[]
  translators: Author[]
}

interface Author {
  id: string
  first_name: string
  last_name: string
  dob: string
  dod: string
}

interface Section {
  id: string
  section_number: string
  title: string
  listen_url: string
  language: string
  playtime: number
  file_name: null
  readers: {
    reader_id: string
    display_name: string
  }[]
}

interface AdvancedSearch {
  status: 'SUCCESS' | string
  results: string
  pagination: string
  search_page: number
}

export const searchMedia = async ({
  title,
  author,
  reader,
  keywords,
  genre_id = 0,
  status = 'all',
  project_type = 'either',
  recorded_language,
  sort_order = 'alpha',
  search_page = 1,
  q,
}: {
  title?: string
  author?: string
  reader?: string
  keywords?: string
  genre_id?: number
  status?: 'all' | 'complete' | 'in_progress' | 'open'
  project_type?: 'either' | 'solo' | 'group'
  recorded_language?: string
  sort_order?: 'alpha' | 'catalog_date'
  search_page?: number
  q?: string
}): Promise<Media[]> => {
  const data = await $fetch<AdvancedSearch>('/advanced_search', {
    // temp proxy
    baseURL: `https://cors-anywhere.herokuapp.com/${baseURL}`,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    query: {
      search_form: 'advanced',
      title,
      author,
      reader,
      keywords,
      genre_id,
      status,
      project_type,
      recorded_language,
      sort_order,
      search_page,
      q,
    },
  })

  if (!data) throw new NotFoundError('Searched media not found...')

  const $ = load(data.results)

  return $('li.catalog-result')
    .toArray()
    .map((element) => {
      const el = $(element)

      const key = el.find('.result-data h3 a').first().text().trim()
      const author = el
        .find('.result-data .book-author a')
        .first()
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim()
      const cover = el.find('a.book-cover img[src]').first().attr('src')

      return {
        key,
        provider,
        meta: {
          title: key,
          author,
          slug: `/media/${provider}/${key}-${key}`,
          type: MediaTypes.AUDIO_BOOK,
          cover,
        },
      }
    })
}

export const getMediaByKey = async ({
  key,
  format = 'json',
  extended = true,
  fields,
}: {
  key: Media['key']
  format?: 'json'
  extended?: boolean
  fields?: Field[]
}): Promise<Media> => {
  const data = await $fetch<{ books: Book[] }>(`/api/feed/audiobooks`, {
    // temp proxy
    baseURL: `https://cors-anywhere.herokuapp.com/${baseURL}`,
    query: {
      id: isNumeric(key) ? Number(key) : undefined,
      title: !isNumeric(key) ? key : undefined,
      format,
      extended,
      fields: fields ? `{${fields.join(',')}}` : undefined,
    },
  })

  const book = data?.books?.[0]
  const author = book?.authors?.[0]
  if (!book || !author) throw new NotFoundError('Media not found...')

  const {
    title,
    description,
    sections,
    language,
    totaltimesecs,
    url_librivox,
    url_zip_file,
    url_iarchive,
  } = book
  const { first_name, last_name, dod, dob } = author

  const customTitle = `[${formatTime(totaltimesecs)}] ${title} (${language})`

  const sources: Media['meta']['sources'] = []

  sources.push({
    type: `LibriVox Player | ${customTitle}`,
    href: url_librivox,
  })
  sources.push({
    type: `Internet Archive Player | ${customTitle}`,
    href: url_iarchive,
  })
  sources.push({
    type: `ZIP with Sections | ${customTitle}`,
    href: url_zip_file,
    sources: sections.map(
      ({ title, listen_url: href, language, playtime, readers }) => ({
        type: `${title} - ${readers[0]?.display_name || 'unknown'} (${language}) - [${formatTime(playtime)}]`,
        href,
      }),
    ),
  })

  return {
    key,
    provider,
    meta: {
      title,
      description,
      author: `${first_name} ${last_name} (${dod || 'unknown'} - ${dob || 'unknown'})`,
      slug: `/media/${provider}/${key}-${title}`,
      cover: url_iarchive
        ? url_iarchive.replace('/details/', '/download/') + '/__ia_thumb.jpg'
        : undefined,
      type: MediaTypes.AUDIO_BOOK,
      sources,
    },
  }
}
