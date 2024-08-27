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

export interface MediaMeta {
  slug: string
  title: string
  author: string
  type: MediaTypes
  year?: number
  cover?: string
  images?: string
  description?: string
  sources?: Map<string, string>
}

export interface Media {
  key: string
  provider: Providers
  meta: MediaMeta
}

export interface OptionItem {
  id: string
  name: string
  icon?: string
}

export type Themes = 'system' | 'dark' | 'light'
