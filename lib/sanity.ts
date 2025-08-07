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
  console.log('getBlogPosts called with categorySlug:', categorySlug);
  
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
    const result = await client.fetch(query);
    console.log('All posts fetched:', result.length);
    return result;
  }

  // Let's first check what categories exist
  const categoryCheck = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      slug,
      "posts": *[_type == "post" && references(^._id)]
    }
  `);
  console.log('Category check:', categoryCheck);

  // Try a more comprehensive query that covers all possible matches
  const query = `*[_type == "post" && count(categories[@->slug.current == $categorySlug || @->parent->slug.current == $categorySlug]) > 0] | order(publishedAt desc) {
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

  const result = await client.fetch(query, { categorySlug });
  
  console.log('Filtered posts query result:', {
    categorySlug,
    postsFound: result.length,
    posts: result
  });

  // If no results, try alternative queries
  if (result.length === 0) {
    console.log('No results found, trying alternative queries...');
    
    // Try simpler direct reference query
    const simpleQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
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

    const simpleResult = await client.fetch(simpleQuery, { categorySlug });
    console.log('Simple query result:', simpleResult.length, 'posts');
    
    if (simpleResult.length > 0) {
      return simpleResult;
    }

    // Try even simpler query by category title
    const titleQuery = `*[_type == "post" && count(categories[@->title match $categoryTitle]) > 0] | order(publishedAt desc) {
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

    const titleResult = await client.fetch(titleQuery, { categoryTitle: categorySlug });
    console.log('Title query result:', titleResult.length, 'posts');
    
    return titleResult;
  }

  return result;
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
  console.log('Sample category structure:', result?.[0]);
  return result;
}

// Helper function to get all posts with their categories for debugging
export async function getAllPostsWithCategories() {
  const result = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      categories[]->{
        _id,
        title,
        slug,
        "parentCategory": parent->{
          _id,
          title,
          slug
        }
      }
    }
  `);
  console.log('All posts with categories:', result);
  return result;
}
