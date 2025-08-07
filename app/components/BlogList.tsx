'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function BlogList({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-white mb-4">No Blogs Found</h3>
        <p className="text-gray-300">
          There are currently no blogs available. Please check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="bento-card h-full flex flex-col">
              <div className="aspect-video rounded-xl mb-4 relative overflow-hidden">
                {blog.mainImage && (
                  <Image
                    src={urlFor(blog.mainImage).url()}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    {blog.categories[0].title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 text-sm line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
