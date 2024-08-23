import type { MediaTypes, ProviderSources } from '~/utils/providers'

export interface MenuLink {
  name: string
  href: string
  icon?: string
}

export interface AccountButtons {
  username: string
  email: string
  password: string
  image?: string
}

export interface MediaMeta {
  slug: string
  title: string
  author: string
  type: MediaTypes
  year?: number
  cover?: string
  images?: string
  description?: string
}

export interface Media {
  key: string
  source: ProviderSources
  meta: MediaMeta
}

export interface OptionItem {
  id: string
  name: string
  icon?: string
}
