
import { getBlogPosts, getCategories, getAllPostsWithCategories } from '../../lib/sanity'
import BlogSidebar from '../components/BlogSidebar'
import BlogList from '../components/BlogList'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Suspense } from 'react'
import { BookOpen, Filter } from 'lucide-react'

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  console.log('BlogPage searchParams:', searchParams);
  
  // Debug: Get all posts with categories to understand the structure
  const debugPosts = await getAllPostsWithCategories();
  
  const allPosts = await getBlogPosts(searchParams.category)
  const categories = await getCategories()
  console.log('BlogPage - Posts count:', allPosts?.length, 'Categories count:', categories?.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation />
      
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Knowledge Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of articles, insights, and resources to enhance your exam preparation journey.
            </p>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-blue-300 mb-8 bg-white/5 backdrop-blur-sm rounded-lg p-3 max-w-fit">
            <span className="text-white">Home</span>
            <span className="mx-2">/</span>
            <span className="text-blue-300">Blog</span>
            {searchParams.category && (
              <>
                <span className="mx-2">/</span>
                <span className="text-white capitalize">{searchParams.category}</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Suspense fallback={
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="animate-pulse">
                    <div className="h-8 bg-white/20 rounded mb-4"></div>
                    <div className="space-y-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-6 bg-white/10 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              }>
                <BlogSidebar categories={categories} selectedCategory={searchParams.category} />
              </Suspense>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">
                    {allPosts?.length || 0} articles found
                  </span>
                  {searchParams.category && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {searchParams.category}
                    </span>
                  )}
                </div>
              </div>
              
              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
                      <div className="aspect-video bg-white/20 rounded-xl mb-4"></div>
                      <div className="h-6 bg-white/20 rounded mb-2"></div>
                      <div className="h-4 bg-white/10 rounded mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              }>
                <BlogList blogs={allPosts} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
