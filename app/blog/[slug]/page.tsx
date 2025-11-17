
import { notFound } from 'next/navigation'
import { getBlogPost, urlFor, getCategories, getBlogPosts } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import BlogPostSidebar from '../../components/BlogPostSidebar'
import { format } from 'date-fns'
import { Calendar, User, ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { Suspense } from 'react'

// Custom PortableText components for better rendering
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mt-10 mb-5 leading-tight border-l-4 border-blue-500 pl-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-blue-200 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-blue-300 mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-200 text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 bg-purple-500/10 pl-6 pr-4 py-4 my-8 italic text-gray-200 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-3 text-gray-200 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-3 text-gray-200 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2 leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-blue-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800/80 text-blue-300 px-2 py-1 rounded text-base font-mono border border-gray-700">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-300 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={450}
          className="w-full h-auto"
        />
        {value.caption && (
          <p className="text-center text-gray-400 text-sm mt-3 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({ value }: any) => (
      <pre className="bg-gray-900/90 border border-gray-700 rounded-xl p-6 my-8 overflow-x-auto">
        <code className="text-green-300 font-mono text-sm leading-relaxed">
          {value.code}
        </code>
      </pre>
    ),
  },
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug)
  const categories = await getCategories()
  const allPosts = await getBlogPosts() // Fetch all posts for sidebar navigation

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation />

      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <article className="lg:col-span-3 order-2 lg:order-1">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-300 hover:text-white transition-colors group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.categories.map((category, index) => (
                  <span
                    key={`${category._id || index}`}
                    className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-400/30 rounded-full text-sm font-medium hover:border-blue-400/50 transition-colors"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light">
                {blog.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              {blog.author && (
                <div className="flex items-center gap-3">
                  {blog.author.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/30">
                      <Image
                        src={urlFor(blog.author.image).url()}
                        alt={blog.author.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <span className="font-medium text-white">{blog.author.name}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="h-8 w-px bg-white/20 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-sm">{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-sm">5 min read</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Educational</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.mainImage && (
            <div className="aspect-video rounded-2xl mb-12 relative overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={urlFor(blog.mainImage).url()}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-8 sm:px-12 py-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-blue-200">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Article Content</span>
              </div>
            </div>

            <div className="px-8 sm:px-12 py-10 sm:py-14">
              <div className="prose-content max-w-none">
                <PortableText
                  value={blog.body}
                  components={portableTextComponents}
                />
              </div>
            </div>
          </div>

          {/* Author Bio Section */}
          {blog.author && (
            <div className="mt-12 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {blog.author.image && (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-4 ring-purple-400/30 shadow-lg">
                    <Image
                      src={urlFor(blog.author.image).url()}
                      alt={blog.author.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wide">About the Author</h3>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{blog.author.name}</h4>
                  {blog.author.bio && (
                    <p className="text-gray-300 leading-relaxed text-lg">{blog.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explore More Articles
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 order-1 lg:order-2">
          <Suspense fallback={
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-6">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="h-16 bg-white/10 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <BlogPostSidebar
              allPosts={allPosts}
              categories={categories}
              currentSlug={params.slug}
            />
          </Suspense>
        </aside>
      </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
