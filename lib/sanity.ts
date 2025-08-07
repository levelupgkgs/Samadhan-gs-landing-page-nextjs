import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Environment variables for Vite
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zg0tonh6'
const dataset = process.env.VITE_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // CDN enabled for production
  apiVersion: '2021-10-21', // Stable API version
  ignoreBrowserTokenWarning: true,
  withCredentials: false,
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: false,
  }
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch blog posts
export async function getBlogPosts(categorySlug?: string) {
  if (!categorySlug) {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        _id,
        title,
        description,
        slug,
        "parentCategory": parent->{
          _id,
          title,
          description,
          slug
        }
      }
    }`;
    return await client.fetch(query);
  }

  // First try to get posts that directly reference this category
  const directQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      title,
      description,
      slug,
      "parentCategory": parent->{
        _id,
        title,
        description,
        slug
      }
    }
  }`;

  // Also try to get posts from subcategories if this is a parent category
  const subcategoryQuery = `*[_type == "post" && references(*[_type == "category" && parent->slug.current == $categorySlug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      title,
      description,
      slug,
      "parentCategory": parent->{
        _id,
        title,
        description,
        slug
      }
    }
  }`;

  const [directPosts, subcategoryPosts] = await Promise.all([
    client.fetch(directQuery, { categorySlug }),
    client.fetch(subcategoryQuery, { categorySlug })
  ]);

  // Combine and deduplicate posts
  const allPosts = [...directPosts, ...subcategoryPosts];
  const uniquePosts = allPosts.filter((post, index, self) => 
    index === self.findIndex(p => p._id === post._id)
  );

  console.log('BlogPosts query results:', {
    categorySlug,
    directPosts: directPosts.length,
    subcategoryPosts: subcategoryPosts.length,
    uniquePosts: uniquePosts.length
  });

  return uniquePosts;
}

// Helper function to fetch a single blog post
export async function getBlogPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      author->{
        name,
        image,
        bio
      },
      categories[]->{
        _id,
        title,
        description,
        slug,
        "parentCategory": parent->{
          _id,
          title,
          description,
          slug
        }
      }
    }
  `, { slug })
}

// Helper function to fetch categories
export async function getCategories() {
  const result = await client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      "parentCategory": parent->{
        _id,
        title,
        slug,
        description
      }
    }
  `);
  console.log('Categories query result:', result);
  return result;
}
