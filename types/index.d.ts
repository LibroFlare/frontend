export interface MenuLink {
  name: string
  href: string
  icon?: string
}
export interface MediaMeta {
  id: number
  title: string
  author: string
  type: "book" | "audiobook" | "comics" | "manga"
  year: number
  mainImage: string
  images: string
  description: string
}
