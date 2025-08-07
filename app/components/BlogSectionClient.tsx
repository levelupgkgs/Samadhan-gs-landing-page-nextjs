"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, User, BarChart3, Sparkles, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { urlFor } from "../../lib/sanity";
import { format } from "date-fns";

export default function BlogSectionClient({ posts }) {
  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20"></div>
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-6 py-3 rounded-full text-blue-300 font-semibold mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BarChart3 className="w-6 h-6 text-blue-400" />
            Expert Analysis & Strategic Insights
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Latest Exam Analysis
            </span>
            <br />
            <span className="text-slate-100 text-4xl lg:text-5xl">
              & Study Strategies
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover comprehensive exam patterns, weightage analysis, previous year questions, and cutting-edge strategies from our experts to accelerate your competitive exam success.
          </motion.p>
        </motion.div>

        {featuredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                className="group backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden hover:border-blue-500/30 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {post.mainImage && (
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={urlFor(post.mainImage).width(400).height(240).url()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/60 transition-colors duration-500"></div>
                    
                    <div className="absolute top-4 right-4 backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 rounded-full p-2">
                      <TrendingUp className="w-4 h-4 text-blue-300" />
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-slate-300">{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
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
                  
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span key={category._id} className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-medium">
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-slate-300 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 p-3 rounded-lg text-center">
                      <Target className="w-4 h-4 mr-2 inline-block" />
                      Read Analysis
                      <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-12 max-w-lg mx-auto shadow-2xl">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BarChart3 className="w-10 h-10 text-blue-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Expert Analysis Coming Soon
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Our expert team is preparing comprehensive exam analysis, strategic insights, and winning formulas to accelerate your success.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Stay tuned for premium content</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/blog">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <BarChart3 className="w-5 h-5 mr-2 inline-block" />
                View All Analysis
                <ArrowRight className="w-5 h-5 ml-2 inline-block" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
