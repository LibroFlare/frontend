export enum Providers {
  OPENLIBRARY = 'openlibrary',
  GUTENDEX = 'gutendex',
  STANDARD_EBOOKS = 'standard_ebooks',
  LIBRIVOX = 'librivox',
}

export enum MediaTypes {
  BOOK = 'book',
  AUDIO_BOOK = 'audiobook',
  COMICS = 'comics',
  MANGA = 'manga',
  POEM = 'poem',
}

interface Provider {
  id: Providers
  url: string
  name?: string
  mediaTypes: MediaTypes[]
}

const { OPENLIBRARY, GUTENDEX, STANDARD_EBOOKS, LIBRIVOX } = Providers
const { BOOK, AUDIO_BOOK } = MediaTypes

export const ProvidersData: Record<Providers, Provider> = {
  openlibrary: {
    id: OPENLIBRARY,
    name: 'Open Library',
    url: 'https://openlibrary.org',
    mediaTypes: [BOOK],
  },
  gutendex: {
    id: GUTENDEX,
    name: 'Projcet Gutenberg',
    url: 'https://gutendex.com',
    mediaTypes: [BOOK, AUDIO_BOOK],
  },
  standard_ebooks: {
    id: STANDARD_EBOOKS,
    name: 'Standard Ebooks',
    url: 'https://standardebooks.org',
    mediaTypes: [BOOK],
  },
  librivox: {
    id: LIBRIVOX,
    name: 'LibriVox',
    url: 'https://librivox.org/',
    mediaTypes: [AUDIO_BOOK],
  },
}
