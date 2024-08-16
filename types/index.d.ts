export interface MenuLink {
  name: string
  href: string
  icon?: string
}
export interface MediaMeta {
  id: string
  slug: string
  title: string
  author: string
  type: 'book' | 'audiobook' | 'comics' | 'manga'
  year: number
  cover: string
  images?: string
  description?: string
}
