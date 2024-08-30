import type { MediaTypes, Providers } from '~/utils/providers'

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

export interface MediaMetaSource {
  href: string
  type?: string
  sources?: MediaMetaSource[]
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
  sources?: MediaMetaSource[]
}

export interface Media {
  key: string
  provider: Providers
  meta: MediaMeta
}

export interface OptionItem<T> {
  id: string
  name: string
  icon?: string
  data?: T
}

export type Themes = 'system' | 'dark' | 'light'
