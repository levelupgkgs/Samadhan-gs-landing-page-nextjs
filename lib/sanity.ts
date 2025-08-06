
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

// GROQ queries
export const blogsQuery = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  publishedAt,
  category
}`

export const blogBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  "coverImage": coverImage.asset->url,
  publishedAt,
  category
}`
