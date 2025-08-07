
import { notFound } from 'next/navigation'
import { getBlogPost, urlFor } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug)
  
  if (!blog) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{blog.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">
              Published on {new Date(blog.publishedAt).toLocaleDateString()} by {blog.author.name}
            </p>
            <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/40 transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="aspect-video rounded-xl mb-8 relative overflow-hidden">
          {blog.mainImage && (
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>

        {/* Summary */}
        {blog.excerpt && (
          <div className="bento-card p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
            <p className="text-gray-300">{blog.excerpt}</p>
          </div>
        )}

        {/* Content */}
        <div className="glass-effect rounded-2xl p-8 sm:p-12">
          <div className="prose prose-lg prose-invert max-w-none">
            <PortableText value={blog.body} />
          </div>
        </div>

        {/* Back to blogs */}
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </main>
  )
}
