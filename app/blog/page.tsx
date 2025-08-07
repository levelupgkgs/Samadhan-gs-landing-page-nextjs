import { getBlogPosts, getCategories } from '../../lib/sanity'
import BlogSidebar from '../components/BlogSidebar'
import BlogList from '../components/BlogList'

export default async function BlogPage({ searchParams }: { searchParams: { category: string } }) {
  const allPosts = await getBlogPosts(searchParams.category)
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <BlogSidebar categories={categories} />
          </div>
          <div className="lg:col-span-3">
            <BlogList blogs={allPosts} />
          </div>
        </div>
      </div>
    </main>
  )
}
