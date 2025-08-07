import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRoute, useLocation } from 'wouter'
import { format } from 'date-fns'
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react'
import { getBlogPost } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Navigation from '@/components/navigation'
import Topbar from '@/components/topbar'
import Footer from '@/components/footer'
import CategorySidebar from '@/components/category-sidebar'
import PortableText from '@/components/PortableText'
import ShareButton from '@/components/share-button'
import SEOHead from '@/components/seo-head'
import { BlogPostStructuredData } from '@/components/structured-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'wouter'
import type { BlogPost } from '@shared/sanity-schemas'

export default function BlogPostPage() {
  const [match, params] = useRoute('/blog/:slug')
  const [, setLocation] = useLocation()
  const slug = params?.slug
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined)

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug!),
    enabled: !!slug,
  })

  // Set the selected category based on the post's first category
  useEffect(() => {
    if (post?.categories && post.categories.length > 0) {
      // Use the first category's slug, or parent category if it exists
      const firstCategory = post.categories[0]
      const categorySlug = firstCategory.parentCategory?.slug?.current || firstCategory.slug?.current
      setSelectedCategorySlug(categorySlug)
    }
  }, [post])

  // Handle category selection - navigate to blog page with category filter
  const handleCategorySelect = (categorySlug?: string) => {
    setLocation(categorySlug ? `/blog?category=${categorySlug}` : '/blog')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <Topbar />
        <Navigation />
        <main className="relative z-10 container mx-auto px-2 py-24 pt-48">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-full mx-auto">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <CategorySidebar
                onSelectCategory={handleCategorySelect}
                selectedCategorySlug={selectedCategorySlug}
              />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <Card className="backdrop-blur-sm bg-slate-800/40 border-slate-700/50 shadow-xl animate-pulse">
                <CardContent className="p-8">
                  <div className="h-8 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-1/4 mb-8"></div>
                  <div className="h-12 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded w-1/2 mb-8"></div>
                  <div className="h-64 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded mb-8"></div>
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-4 bg-gradient-to-r from-slate-600/50 to-slate-500/50 rounded"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <div className="relative z-10 backdrop-blur-sm bg-slate-900/90 border-t border-slate-700/50 mt-20">
          <Footer />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <Topbar />
        <Navigation />
        <main className="relative z-10 container mx-auto px-2 py-24 pt-48">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-full mx-auto">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <CategorySidebar
                onSelectCategory={handleCategorySelect}
                selectedCategorySlug={selectedCategorySlug}
              />
            </aside>

            {/* Error Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <Card className="backdrop-blur-sm bg-red-900/20 border border-red-500/30 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-red-400" />
                  </div>
                  <h1 className="text-4xl font-bold text-red-300 mb-4">
                    Blog Post Not Found
                  </h1>
                  <p className="text-red-400 text-lg mb-8 leading-relaxed">
                    The blog post you're looking for doesn't exist or may have been moved.
                  </p>
                  <Link href="/blog">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <div className="relative z-10 backdrop-blur-sm bg-slate-900/90 border-t border-slate-700/50 mt-20">
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEOHead
        title={post ? `${post.title} | Samadhan GS Blog` : "Blog Post | Samadhan GS"}
        description={post?.excerpt || "Expert insights and analysis for competitive exam preparation at Samadhan GS."}
        keywords={`${post?.categories?.map((cat: any) => cat.title).join(', ') || ''}, competitive exams, UPSC, SSC, banking exams, exam analysis, study tips`}
        url={`https://samadhang.replit.app/blog/${slug || ''}`}
        type="article"
        publishedTime={post?.publishedAt}
        author={post?.author?.name}
        section="Education"
        tags={post?.categories?.map((cat: any) => cat.title) || []}
        image={post?.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
      />
      <BlogPostStructuredData
        title={post?.title || "Blog Post"}
        description={post?.excerpt || "Expert insights for competitive exam preparation"}
        url={`https://samadhang.replit.app/blog/${slug || ''}`}
        image={post?.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
        publishedTime={post?.publishedAt}
        author={post?.author?.name}
        category={post?.categories?.[0]?.title}
      />
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <Topbar />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-2 py-24 pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-full mx-auto">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <CategorySidebar
              onSelectCategory={handleCategorySelect}
              selectedCategorySlug={selectedCategorySlug}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Back button */}
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Article */}
            <Card className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 shadow-2xl overflow-hidden">
              {post.mainImage && (
                <div className="relative h-64 md:h-96 overflow-hidden group">
                  <img
                    src={urlFor(post.mainImage).width(1600).height(800).quality(90).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
                </div>
              )}

              <CardContent className="p-8 md:p-12 lg:p-16">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((category: any) => (
                      <Badge key={category._id} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {category.parentCategory ? `${category.parentCategory.title} > ${category.title}` : category.title}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-8 leading-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text">
                  {post.title}
                </h1>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <time dateTime={post.publishedAt} className="text-slate-300">
                      {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                    </time>
                  </div>
                  
                  {post.author && (
                    <div className="flex items-center gap-3">
                      {post.author.image && (
                        <img
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
                        />
                      )}
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span className="font-medium text-slate-300">{post.author.name}</span>
                      </div>
                    </div>
                  )}

                  <ShareButton
                    url={`${window.location.origin}/blog/${post.slug.current}`}
                    title={post.title}
                    description={post.excerpt}
                    className="ml-auto"
                  />
                </div>

                {/* Excerpt */}
                {post.excerpt && (
                  <div className="text-xl text-slate-300 mb-10 font-medium leading-relaxed bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Summary</span>
                    </div>
                    {post.excerpt}
                  </div>
                )}

                {/* Content */}
                {post.body && (
                  <div className="max-w-none text-slate-300 leading-relaxed">
                    <PortableText value={post.body} />
                  </div>
                )}

                {/* Author bio */}
                {post.author && post.author.bio && (
                  <div className="mt-12 pt-8 border-t border-slate-700/50">
                    <div className="flex items-start gap-4">
                      {post.author.image && (
                        <img
                          src={urlFor(post.author.image).width(80).height(80).url()}
                          alt={post.author.name}
                          className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-slate-600"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100 mb-2">
                          About {post.author.name}
                        </h3>
                        <div className="text-slate-300 prose prose-sm dark:prose-invert prose-p:text-slate-300">
                          <PortableText value={post.author.bio} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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
