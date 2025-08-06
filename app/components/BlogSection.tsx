
'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Mock blog data (replace with actual Sanity integration)
const mockBlogs = [
  {
    _id: '1',
    title: 'UPSC 2024: Key Changes in Syllabus You Must Know',
    slug: 'upsc-2024-syllabus-changes',
    excerpt: 'Important updates in UPSC syllabus for 2024 and how to adapt your preparation strategy accordingly.',
    coverImage: '/api/placeholder/400/300',
    publishedAt: '2024-01-15',
    category: 'UPSC'
  },
  {
    _id: '2',
    title: 'Top 10 Current Affairs Topics for SSC Exams',
    slug: 'ssc-current-affairs-topics',
    excerpt: 'Stay updated with the most important current affairs topics that frequently appear in SSC examinations.',
    coverImage: '/api/placeholder/400/300',
    publishedAt: '2024-01-10',
    category: 'SSC'
  },
  {
    _id: '3',
    title: 'Effective Study Techniques for Government Exams',
    slug: 'effective-study-techniques',
    excerpt: 'Proven study methods and techniques that will help you prepare more efficiently for competitive exams.',
    coverImage: '/api/placeholder/400/300',
    publishedAt: '2024-01-05',
    category: 'Study Tips'
  }
]

export default function BlogSection() {
  const [blogs, setBlogs] = useState(mockBlogs)

  // In a real implementation, you would fetch from Sanity here
  useEffect(() => {
    // fetchBlogs()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Latest <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert tips, exam updates, and preparation strategies
          </p>
        </motion.div>

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
              <Link href={`/blog/${blog.slug}`}>
                <div className="bento-card h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                        {blog.category}
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
      </div>
    </section>
  )
}
