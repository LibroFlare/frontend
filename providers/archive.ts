import type { Media } from '~/types'

interface File {
  name: string
  source: 'original' | 'derivative' | 'metadata'
  original?: string
  mtime: string
  size: number
  md5?: string
  crc32?: string
  sha1?: string
  rotation?: string
  format: string
}

interface Metadata {
  'access-restricted-item'?: boolean
  title: string
  creator?: string[]
  description?: string[]
  publisher?: string
  date?: string
  language?: string[]
  'page-progression'?: 'lr' | string
  sponsor?: string
  contributor?: string
  scanningcenter?: string
  mediatype?: 'texts' | string
  call_number?: string
  updatedate?: string
  updater?: string
  identifier?: string
  uploader?: string
  addeddate?: string
  publicdate?: string
  ppi?: number
  camera?: string
  operator?: string
  scanner?: string
  scandate?: string
  imagecount?: string
  foldoutcount?: string
  'identifier-access'?: string
  'identifier-ark'?: string
  bookplateleaf?: string
  repub_state?: string
  notes?: string
  curation?: string
  sponsordate?: string
  collection?: string[]
  backup_location?: string
  openlibrary_edition?: string
  openlibrary_work?: string
  'external-identifier'?: string
  filesxml?: string
  'associated-names'?: string
  ocr_module_version?: string
  ocr_converted?: string
  page_number_confidence?: string
  page_number_module_version?: string
}

interface ArchiveMetadata {
  // ... a lot of types I didn't specify
  files: File[]
  metadata: Metadata
}

export const getArchiveSourceFiles = async (ocaid: string) => {
  const archive = await $fetch<ArchiveMetadata>(`/metadata/${ocaid}`, {
    baseURL: 'https://archive.org',
  })

  if (!archive) throw new NotFoundError('Archive Metadata not found...')

  const sources: Media['meta']['sources'] = archive.files
    .filter(
      ({ name }) =>
        ![
          '_page_numbers.',
          '_metasource.',
          '_searchtext.',
          '_pageindex.',
          '_scandata.',
          '__ia_thumb',
          '_reviews.',
          '.torrent',
          '_events.',
          '_loans.',
          '_files.',
          '_meta.',
          '_marc.',
          '_meta',
          '.log',
          '.gif',
          '_dc.',
        ].some((keyword) => name.includes(keyword)),
    )
    .map(({ name, format, size }) => ({
      type: `${format} (${formatSize(size)})`,
      href: `https://archive.org/download/${ocaid}/${name}`,
    }))

  return {
    restricted: archive.metadata['access-restricted-item'] || false,
    metadata: archive.metadata,
    sources,
  }
}
