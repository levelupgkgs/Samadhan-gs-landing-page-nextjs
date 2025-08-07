
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
      {blogs.map((blog, index) => (
        <motion.div
          key={blog._id}
          className="group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/blog/${blog.slug.current}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                {blog.mainImage ? (
                  <Image
                    src={urlFor(blog.mainImage).url()}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-4xl opacity-50">📰</span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Categories and Date */}
                <div className="flex items-center justify-between mb-3">
                  {blog.categories && blog.categories.length > 0 && (
                    <span className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-medium">
                      {blog.categories[0].title}
                    </span>
                  )}
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{format(new Date(blog.publishedAt), 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 text-lg leading-tight">
                  {blog.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-300 text-sm line-clamp-3 flex-grow mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                {/* Meta and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center text-xs text-gray-400 gap-4">
                    {blog.author && (
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{blog.author.name}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  
                  <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors flex items-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
