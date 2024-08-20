export enum ProviderSources {
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
  id: ProviderSources
  url: string
  mediaTypes: MediaTypes[]
}

const { GUTENDEX, OPENLIBRARY } = ProviderSources
const { BOOK, AUDIO_BOOK } = MediaTypes

export const ProvidersData: Record<ProviderSources, Provider> = {
  gutendex: {
    id: GUTENDEX,
    url: 'https://gutendex.com',
    mediaTypes: [BOOK, AUDIO_BOOK],
  },
  openlibrary: {
    id: OPENLIBRARY,
    url: 'https://openlibrary.org',
    mediaTypes: [BOOK],
  },
}
