'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Tag, BookOpen, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface Category {
  _id: string
  title: string
  slug?: {
    current: string
  }
  description?: string
  parentCategory?: {
    _id: string
    title: string
    slug?: {
      current: string
    }
  }
}

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  categories?: Category[]
}

interface BlogPostSidebarProps {
  allPosts: BlogPost[]
  categories: Category[]
  currentSlug: string
}

export default function BlogPostSidebar({ allPosts, categories, currentSlug }: BlogPostSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // Group categories by parent
  const parentCategories = categories?.filter(cat => !cat.parentCategory) || []
  const childCategories = categories?.filter(cat => cat.parentCategory) || []

  const getChildCategories = (parentId: string) => {
    return childCategories.filter(child => child.parentCategory?._id === parentId)
  }

  // Get blog posts for a specific category (including posts from child categories)
  const getPostsForCategory = (categoryId: string, includeChildren: boolean = true) => {
    if (!allPosts) return []

    // Get all descendant category IDs
    let categoryIds = [categoryId]

    if (includeChildren) {
      const descendants = getChildCategories(categoryId)
      categoryIds = [categoryId, ...descendants.map(cat => cat._id)]
    }

    return allPosts.filter(post =>
      post.categories?.some(cat => categoryIds.includes(cat._id))
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Browse Articles</h3>
      </div>

      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-white/5">
        {/* All Posts Link */}
        <Link href="/blog" className="
          flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
          text-white hover:bg-white/10
        ">
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">All Articles</span>
        </Link>

        {/* Parent Categories */}
        {parentCategories.map((category) => {
          const childCats = getChildCategories(category._id)
          const categoryPosts = getPostsForCategory(category._id)
          const isExpanded = expandedCategories.includes(category._id)

          return (
            <div key={category._id} className="space-y-1">
              <div className="flex items-center">
                <button
                  onClick={() => toggleCategory(category._id)}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group flex-1 text-white hover:bg-white/10"
                >
                  <Tag className="w-4 h-4" />
                  <span className="font-medium flex-1 text-left">{category.title}</span>
                  <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full">
                    {categoryPosts.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Show posts for this parent category and its subcategories */}
              {isExpanded && (
                <div className="ml-6 space-y-1 border-l border-white/10 pl-4">
                  {/* Only show posts that are DIRECTLY in parent category (not in any subcategory) */}
                  {categoryPosts.filter(post => {
                    // Check if post is directly in parent category and NOT in any child category
                    const isInParent = post.categories?.some(cat => cat._id === category._id)
                    const isInAnyChild = childCats.some(childCat =>
                      post.categories?.some(cat => cat._id === childCat._id)
                    )
                    return isInParent && !isInAnyChild
                  }).map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group text-sm
                        ${currentSlug === post.slug.current
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-2 leading-snug">
                          {post.title}
                        </p>
                        <p className="text-xs mt-1 opacity-70">
                          {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      {currentSlug === post.slug.current && (
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full flex-shrink-0">
                          ✓
                        </span>
                      )}
                    </Link>
                  ))}

                  {/* Child Categories */}
                  {childCats.map((subCategory) => {
                    const subCategoryPosts = getPostsForCategory(subCategory._id, false)
                    const isSubExpanded = expandedCategories.includes(subCategory._id)

                    return (
                      <div key={subCategory._id} className="space-y-1">
                        <button
                          onClick={() => toggleCategory(subCategory._id)}
                          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-300 group text-sm text-white hover:bg-white/10 w-full"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSubExpanded ? 'rotate-90' : ''}`} />
                          <span className="flex-1 text-left">{subCategory.title}</span>
                          <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded-full">
                            {subCategoryPosts.length}
                          </span>
                        </button>

                        {/* Posts in subcategory */}
                        {isSubExpanded && subCategoryPosts.length > 0 && (
                          <div className="ml-6 space-y-1 border-l border-white/10 pl-3">
                            {subCategoryPosts.map((post) => (
                              <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className={`
                                  flex items-start gap-2 p-2 rounded-lg transition-all duration-300 group text-xs
                                  ${currentSlug === post.slug.current
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'text-white hover:bg-white/10'
                                  }
                                `}
                              >
                                <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium line-clamp-2 leading-snug">
                                    {post.title}
                                  </p>
                                  <p className="text-xs mt-1 opacity-70">
                                    {format(new Date(post.publishedAt), 'MMM dd')}
                                  </p>
                                </div>
                                {currentSlug === post.slug.current && (
                                  <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                    ✓
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Standalone posts without categories */}
        {allPosts?.filter(post => !post.categories || post.categories.length === 0).length > 0 && (
          <div className="space-y-1">
            <div className="text-white text-sm font-medium px-3 py-2">Uncategorized</div>
            {allPosts
              .filter(post => !post.categories || post.categories.length === 0)
              .map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg transition-all duration-300 group text-sm
                    ${currentSlug === post.slug.current
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs mt-1 opacity-70">
                      {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  {currentSlug === post.slug.current && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full flex-shrink-0">
                      ✓
                    </span>
                  )}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
