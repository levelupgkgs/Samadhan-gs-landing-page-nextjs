
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'
import { format } from 'date-fns'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'

export default function BlogList({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Articles Found</h3>
        <p className="text-gray-300 mb-6">
          There are currently no articles in this category. Please check back later or explore other categories.
        </p>
        <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowRight className="w-4 h-4 mr-2" />
          Browse All Articles
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogs.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 h-full flex flex-col">
            {post.mainImage && (
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(400).height(240).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.slice(0, 2).map((category, catIndex) => (
                    <span 
                      key={`${post._id}-category-${category._id || catIndex}`} 
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium"
                    >
                      {category.parentCategory ? `${category.parentCategory.title} > ${category.title}` : category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta info */}
              <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-slate-300">
                    {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                {post.author && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="text-slate-300">{post.author.name}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-slate-300 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
              )}

              {/* Read More Button */}
              <Link 
                href={`/blog/${post.slug.current}`}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25 mt-auto"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
