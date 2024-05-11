export interface Project {
  name: string
  date: string
  title: string
  description: string
  images: string[]
  webpImages: string[]
  videos: string[]
  list: { [key: string]: string }
  link: string[]
  colors: string[]
}
