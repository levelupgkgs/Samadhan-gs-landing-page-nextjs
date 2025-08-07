
import { notFound } from 'next/navigation'
import { getBlogPost, urlFor } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { format } from 'date-fns'
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug)
  
  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation />
      
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-blue-300 mb-6 bg-white/5 backdrop-blur-sm rounded-lg p-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{blog.title}</span>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all articles
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.categories.map((category, index) => (
                  <span key={`${category._id || index}`} className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                    {category.title}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{format(new Date(blog.publishedAt), 'MMM dd, yyyy')}</span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  <span>{blog.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>5 min read</span>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {blog.mainImage && (
            <div className="aspect-video rounded-2xl mb-8 relative overflow-hidden shadow-2xl">
              <Image
                src={urlFor(blog.mainImage).url()}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Summary */}
          {blog.excerpt && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-bold">📝</span>
                Summary
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">{blog.excerpt}</p>
            </div>
          )}

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-white/10 shadow-xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <PortableText value={blog.body} />
            </div>
          </div>

          {/* Author Info */}
          {blog.author && (
            <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-start gap-4">
                {blog.author.image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(blog.author.image).url()}
                      alt={blog.author.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">About the Author</h3>
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">{blog.author.name}</h4>
                  {blog.author.bio && (
                    <p className="text-gray-300">{blog.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
