import type { Media } from '~/types'

interface ArchiveFile {
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

interface ArchiveMetadata {
  // ... a lot of types I didn't specify
  files: ArchiveFile[]
  metadata: { 'access-restricted-item'?: boolean }
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
    sources,
  }
}
