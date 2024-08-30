export enum Providers {
  OPENLIBRARY = 'openlibrary',
  GUTENDEX = 'gutendex',
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

const { GUTENDEX, OPENLIBRARY } = Providers
const { BOOK, AUDIO_BOOK } = MediaTypes

export const ProvidersData: Record<Providers, Provider> = {
  gutendex: {
    id: GUTENDEX,
    name: 'Projcet Gutenberg',
    url: 'https://gutendex.com',
    mediaTypes: [BOOK, AUDIO_BOOK],
  },
  openlibrary: {
    id: OPENLIBRARY,
    name: 'Open Library',
    url: 'https://openlibrary.org',
    mediaTypes: [BOOK],
  },
}
