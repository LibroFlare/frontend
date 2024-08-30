import { getArchiveSourceFiles } from './archive'
import { getMediaByKey as getLibrivoxMediaByKey } from './librivox'
import { getMediaByKey as getStandardebooksMediaByKey } from './standardebooks'
import type { Media, MediaMeta } from '~/types'
import { NotFoundError } from '~/utils/errors'

const { id: provider, url: baseURL } = ProvidersData.openlibrary

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

interface Entry {
  key: string
  title: string
  publish_date: string
  ocaid?: string
  local_id?: string[]
  oclc_numbers?: string[]
  lccn?: string[]
  isbn_13?: string[]
  isbn_10?: string[]
  covers?: string[]
  identifiers?: {
    project_gutenberg?: string[]
    librivox?: string[]
    standard_ebooks?: string[]
    amazon?: string[]
    goodreads?: string[]
    librarything?: string[]
    better_world_books?: string[]
  }
  physical_format?: string
  number_of_pages?: number
  pagination?: string
  weight?: number
  publishers?: string[]
  publish_places?: string[]
  languages?: { key: string }[]
}

interface Editions {
  links: {
    self: string
    work: string
    next: string
  }
  size: number
  entries: Entry[]
}

interface VolumeRecord {
  isbns: string[]
  issns: string[]
  lccns: string[]
  oclcs: string[]
  olids: string[]
  publishDates: number[]
  recordURL: string
  data: {
    url: string
    key: string
    title: string
    subtitle?: string
    authors?: {
      url: string
      name: string
    }[]
    number_of_pages?: number
    identifiers?: { [key: string]: string[] }
    publishers?: { name: string }[]
    publish_date: number
    subjects?: {
      name: string
      url: string
    }[]
    subject_places?: {
      name: string
      url: string
    }[]
    subject_people?: {
      name: string
      url: string
    }[]
    subject_times?: {
      name: string
      url: string
    }[]
    excerpts?: {
      text: string
      comment: string
    }[]
    links?: {
      title: string
      url: string
    }[]
    ebooks?: {
      preview_url?: string
      availability: 'full' | 'restricted' | 'borrow' | string
      formats?: { [key: 'pdf' | 'epub' | 'text' | string]: { url: string } }
      borrow_url?: string
    }[]
    cover: {
      small: string
      medium: string
      large: string
    }
  }
  details: {
    bib_key: string
    info_url: string
    preview: string
    preview_url: string
    thumbnail_url: string
    details: {
      works: {
        key: '/works/OL468431W'
      }[]
      title: string
      publishers: string[]
      publish_date: number
      key: string
      type: { key: string }
      identifiers?: { [key: string]: string }
      covers: number[]
      isbn_13: string[]
      classifications?: { [key: string]: string }
      languages?: { key: string }[]
      number_of_pages: number
      copyright_date: string
      physical_format: string
      subtitle: string
      latest_revision: number
      revision: number
      created?: {
        type: string
        value: string
      }
      last_modified?: {
        type: string
        value: string
      }
    }
  }
}

interface VolumeItem {
  enumcron: string
  match: 'exact' | 'similar'
  status: 'full access' | 'lendable' | 'checked out' | 'restricted'
  fromRecord?: string
  'ol-edition-id'?: string
  'ol-work-id'?: string
  publishDate: number
  contributor?: string
  itemURL: string
  cover: {
    small: string
    medium: string
    large: string
  }
}

interface Volumes {
  records: {
    [key: string]: VolumeRecord
  }
  items: VolumeItem[]
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
      provider,
      meta: {
        title,
        slug: `/media/${provider}/${key}-${title}`,
        author: media.author_name?.[0] || 'unknown',
        type: MediaTypes.BOOK,
        year: media.first_publish_year,
        cover: media.cover_i ? getCoverUrl(media.cover_i) : undefined,
      },
    } as Media
  })
}

export const searchMedia = async (query: string, limit: number = 20) => {
  const data = await $fetch<Search>('/search.json', {
    baseURL,
    query: {
      q: query,
      fields,
      limit,
    },
  })

  if (!data) throw new NotFoundError('Searched media not found...')

  return formatMedia(data.docs)
}

export const getTrendingMedia = async (limit: number = 20) => {
  const data = await $fetch<Trending>('/trending.json', {
    baseURL,
    query: {
      fields,
      sort: 'random',
      limit,
    },
  })

  if (!data) throw new NotFoundError('Trending media not found...')

  return formatMedia(data.works)
}

export const getMediaByKey = async (key: Media['key']) => {
  const data = await $fetch<Work>(`/works/${key}.json`, { baseURL })

  if (!data) throw new NotFoundError('Media not found...')

  const author = ref<Author>()
  if (data.authors?.[0].author.key) {
    author.value = await getAuthorByKey(data.authors[0].author.key)
  }

  if (!author) throw new NotFoundError('Media not found...')

  const media = formatMedia([
    {
      key: data.key,
      title: data.title,
      author_name: [author.value?.name || 'unknown'],
      first_publish_year: data.first_publish_date,
      cover_i: data.covers[0],
    },
  ])[0]

  // add sources
  media.meta.sources = await getSources(key)

  return media
}

export const getAuthorByKey = async (key: string) => {
  const data = await $fetch<Author>(`${key}.json`, { baseURL })

  if (!data) throw new NotFoundError('Author not found...')

  return data
}

export const getEditions = async (key: Media['key']) => {
  const editions = await $fetch<Editions>(`/works/${key}/editions.json`, {
    baseURL,
  })

  if (!editions) throw new NotFoundError('Editions not found...')

  return editions
}

export const getArchiveSources = async (editions: Editions) => {
  const sources: MediaMeta['sources'] = []

  for (const { title, publish_date, ocaid } of editions.entries) {
    if (ocaid && ocaid.trim() !== '') {
      const sourceFormats = await getArchiveSourceFiles(ocaid)

      sources.push({
        type:
          `${title} (${publish_date})` +
          (sourceFormats.restricted ? ' - PREVIEW ONLY' : ''),
        href: `https://archive.org/details/${ocaid}/mode/2up?ref=ol&view=theater`,
        sources: sourceFormats.sources,
      })
    }
  }

  return sources
}

export const getSources = async (key: Media['key']) => {
  const sources: Media['meta']['sources'] = []

  const editions = await getEditions(key)
  const archiveSources = await getArchiveSources(editions)
  if (archiveSources) sources.push(...archiveSources)

  for (const { identifiers } of editions.entries) {
    if (identifiers && identifiers.standard_ebooks)
      for (const identifier of identifiers.standard_ebooks) {
        const standardebook = await getStandardebooksMediaByKey(identifier)

        if (standardebook.meta.sources)
          sources.push({
            href: standardebook.meta.slug,
            type: `${standardebook.meta.title} (${ProvidersData?.[standardebook.provider].name || standardebook.provider})`,
            sources: standardebook.meta.sources,
          })
      }

    if (identifiers && identifiers.librivox)
      for (const identifier of identifiers.librivox) {
        const librivox = await getLibrivoxMediaByKey({ key: identifier })

        if (librivox.meta.sources)
          sources.push({
            href: librivox.meta.slug,
            type: `${librivox.meta.title} (${ProvidersData?.[librivox.provider].name || librivox.provider})`,
            sources: librivox.meta.sources,
          })
      }
  }

  let type
  let value

  for (const { oclc_numbers, lccn, isbn_13, isbn_10 } of editions.entries) {
    if (oclc_numbers?.[0]) {
      type = 'oclc'
      value = oclc_numbers[0]
      break
    } else if (lccn?.[0]) {
      type = 'lccn'
      value = lccn[0]
      break
    } else if (isbn_13?.[0]) {
      type = 'isbn'
      value = isbn_13[0]
      break
    } else if (isbn_10?.[0]) {
      type = 'isbn'
      value = isbn_10[0]
      break
    }
  }

  if (!type || !value)
    throw new NotFoundError('Edition identifiers not found...')

  // volumes
  const volumes = await $fetch<Volumes>(
    `/api/volumes/full/${type}/${value}.json`,
    {
      // temp proxy
      baseURL: `https://cors-anywhere.herokuapp.com/${baseURL}`,
    },
  )
  if (!volumes) throw new NotFoundError('Volumes not found...')

  // records -> sources
  for (const [
    _,
    {
      data: { ebooks },
    },
  ] of Object.entries(volumes.records)) {
    if (ebooks && ebooks.length > 1)
      for (const { preview_url, formats } of ebooks) {
        if (preview_url) sources.push({ type: 'preview', href: preview_url })
        if (formats)
          for (const [type, { url: href }] of Object.entries(formats))
            sources.push({ type, href })
      }
  }

  // items -> sources
  for (const { publishDate, itemURL: href } of volumes.items) {
    const ocaid = new URL(href).pathname.replace('/stream/', '')
    const isDuplicate = sources.some(({ href: existingHref }) =>
      existingHref.includes(ocaid),
    )

    if (!isDuplicate) {
      const volumeItemArchiveSources = await getArchiveSourceFiles(ocaid)
      sources.push({
        type:
          volumeItemArchiveSources.metadata.title +
          (publishDate ? ` (${publishDate})` : '') +
          (volumeItemArchiveSources.restricted ? ' - PREVIEW ONLY' : ''),
        href,
        sources: volumeItemArchiveSources.sources,
      })
    }
  }

  return sources
}
