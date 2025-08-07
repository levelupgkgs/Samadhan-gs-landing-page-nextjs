import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import Navigation from '@/components/navigation';
import Topbar from '@/components/topbar';
import Footer from '@/components/footer';
import SEOHead from '@/components/seo-head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CategorySidebar from '@/components/category-sidebar'; // Import the new sidebar component
import type { BlogPost } from '@shared/sanity-schemas';

export default function Blog() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts', selectedCategorySlug],
    queryFn: () => getBlogPosts(selectedCategorySlug),
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEOHead
        title="Samadhan GS Blog - Competitive Exam Analysis & Study Tips"
        description="Get expert insights, exam analysis, and preparation tips for UPSC, SSC, Banking, and Railway exams. Latest current affairs, study strategies, and success stories."
        keywords="competitive exam blog, UPSC analysis, SSC tips, banking exam strategy, railway jobs, current affairs, exam preparation, study guides, government jobs"
        url="https://samadhang.replit.app/blog"
        type="website"
      />
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 animate-pulse"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <Topbar />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-2 py-24 pt-48">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl">
            Samadhan GS Blog
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Expert insights, study tips, and comprehensive guides to help you excel in competitive exams
          </p>
          
          {/* Floating badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm">
              Latest Updates
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm">
              Expert Tips
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm">
              Study Guides
            </Badge>
          </div>
        </div>

        {/* Main content area with sidebar and blog posts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-full mx-auto">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <CategorySidebar
              onSelectCategory={setSelectedCategorySlug}
              selectedCategorySlug={selectedCategorySlug}
            />
          </aside>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2 grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {isLoading && (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse backdrop-blur-sm bg-slate-800/40 border-slate-700/50">
                  <div className="h-48 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-4 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-3/4"></div>
                    <div className="h-3 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded"></div>
                      <div className="h-3 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {error && (
              <div className="col-span-full text-center py-12">
                <div className="backdrop-blur-sm bg-red-900/20 border border-red-500/30 rounded-xl p-8 max-w-md mx-auto shadow-2xl">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-300 mb-3">
                    Unable to load blog posts
                  </h3>
                  <p className="text-red-400 mb-6 leading-relaxed">
                    CORS configuration needed in Sanity dashboard.
                  </p>
                  <details className="text-left text-sm">
                    <summary className="cursor-pointer text-red-300 font-medium hover:text-red-200 transition-colors">
                      View error details
                    </summary>
                    <pre className="mt-3 p-3 bg-red-950/50 rounded-lg text-xs overflow-auto text-red-200 border border-red-800/30">
                      {error?.message || 'Unknown error'}
                    </pre>
                  </details>
                </div>
              </div>
            )}

            {posts && posts.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="backdrop-blur-sm bg-blue-900/20 border border-blue-500/30 rounded-xl p-8 max-w-lg mx-auto shadow-2xl">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-4">
                    No blog posts yet
                  </h3>
                  <p className="text-blue-400 text-lg leading-relaxed">
                    Check back soon for expert insights and study guides!
                  </p>
                  <div className="mt-6 text-blue-500 text-sm">
                    Stay tuned for comprehensive exam preparation content
                  </div>
                </div>
              </div>
            )}

            {posts && posts.map((post: BlogPost) => (
              <Card key={post._id} className="group hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 border border-slate-700/50 shadow-xl bg-slate-800/40 backdrop-blur-md hover:bg-slate-800/60 hover:border-blue-500/30 hover:scale-105">
                {post.mainImage && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={urlFor(post.mainImage).width(400).height(240).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                    {post.author && (
                      <>
                        <span>•</span>
                        <User className="w-4 h-4" />
                        <span className="text-slate-300">{post.author.name}</span>
                      </>
                    )}
                  </div>
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category: any) => (
                        <Badge key={category._id} className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                          {category.parentCategory ? `${category.parentCategory.title} > ${category.title}` : category.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <CardTitle className="text-slate-100 group-hover:text-blue-300 transition-colors mb-2 text-lg font-bold leading-tight">
                    {post.title}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-3 text-slate-300 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Link href={`/blog/${post.slug.current}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer with enhanced backdrop */}
      <div className="relative z-10 backdrop-blur-sm bg-slate-900/90 border-t border-slate-700/50 mt-20">
        <Footer />
      </div>
    </div>
  )
}
