import type { Media } from '~/types'
import { NotFoundError } from '~/utils/errors'

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

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const hoursStr = hours.toString().padStart(2, '0')
  const minutesStr = minutes.toString().padStart(2, '0')
  const secsStr = secs.toString().padStart(2, '0')

  return `${hoursStr}:${minutesStr}:${secsStr}`
}

// Example usage
const timeInSeconds = 1851
console.log(formatTime(timeInSeconds)) // Output: "00:30:51"

export const searchMedia = async (search: string) => {
  const data = await $fetch('/books/', {
    baseURL,
    query: {
      search,
    },
  })

  if (!data) throw new NotFoundError('Searched media not found...')
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
      id: key,
      format,
      extended,
      fields: fields ? `{${fields.join(',')}}` : undefined,
    },
  })

  if (!data) throw new NotFoundError('Media not found...')

  const {
    title,
    authors: [{ first_name, last_name, dod, dob }],
    description,
    sections,
    language,
    totaltimesecs,
    url_librivox,
    url_zip_file,
    url_iarchive,
  } = data.books[0]

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
      ({
        title,
        listen_url: href,
        language,
        playtime,
        readers: [{ display_name }],
      }) => ({
        type: `${title} - ${display_name} (${language}) - [${formatTime(playtime)}]`,
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
