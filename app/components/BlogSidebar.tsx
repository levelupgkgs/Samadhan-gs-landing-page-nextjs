
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Tag, BookOpen } from 'lucide-react'

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

interface BlogSidebarProps {
  categories: Category[]
  selectedCategory?: string
}

export default function BlogSidebar({ categories, selectedCategory }: BlogSidebarProps) {
  // Auto-expand categories that are selected or have selected subcategories
  const getInitialExpandedCategories = () => {
    if (!selectedCategory || !categories) return []

    const expandedIds: string[] = []

    // Find if the selected category is a subcategory
    const selectedCat = categories.find(cat => cat.slug?.current === selectedCategory)

    if (selectedCat?.parentCategory) {
      // If it's a subcategory, expand its parent
      expandedIds.push(selectedCat.parentCategory._id)
    }

    return expandedIds
  }

  const [expandedCategories, setExpandedCategories] = useState<string[]>(getInitialExpandedCategories())

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

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl sticky top-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="p-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Categories</h3>
          <p className="text-xs text-gray-400">Filter by topic</p>
        </div>
      </div>
      
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-white/5">
        {/* All Posts Link */}
        <Link href="/blog" className={`
          flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden
          ${!selectedCategory
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
            : 'text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02]'
          }
        `}>
          <BookOpen className={`w-4 h-4 ${!selectedCategory ? '' : 'group-hover:scale-110 transition-transform'}`} />
          <span className="font-medium">All Posts</span>
          {!selectedCategory && (
            <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded-full font-semibold animate-pulse">
              ✓
            </span>
          )}
          {selectedCategory && (
            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </Link>

        {/* Parent Categories */}
        {parentCategories.map((category) => {
          const childCats = getChildCategories(category._id)
          const isExpanded = expandedCategories.includes(category._id)
          const categorySlug = category.slug?.current
          const isCategorySelected = selectedCategory === categorySlug

          return (
            <div key={category._id} className="space-y-1">
              <div className="flex items-center gap-1">
                <Link
                  href={categorySlug ? `/blog?category=${categorySlug}` : '/blog'}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group flex-1
                    ${isCategorySelected
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02]'
                    }
                  `}
                >
                  <Tag className={`w-4 h-4 ${isCategorySelected ? '' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-medium">{category.title}</span>
                  {isCategorySelected && (
                    <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded-full font-semibold animate-pulse">
                      ✓
                    </span>
                  )}
                </Link>

                {childCats.length > 0 && (
                  <button
                    onClick={() => toggleCategory(category._id)}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${
                      isExpanded
                        ? 'text-blue-400 bg-blue-500/20'
                        : 'text-white hover:text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Child Categories */}
              {childCats.length > 0 && isExpanded && (
                <div className="ml-6 space-y-1 border-l border-white/10 pl-4">
                  {childCats.map((subCategory) => {
                    const subCategorySlug = subCategory.slug?.current
                    const isSubCategorySelected = selectedCategory === subCategorySlug

                    return (
                      <Link
                        key={subCategory._id}
                        href={subCategorySlug ? `/blog?category=${subCategorySlug}` : '/blog'}
                        className={`
                          flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 group text-sm
                          ${isSubCategorySelected
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                            : 'text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02]'
                          }
                        `}
                      >
                        <ChevronRight className={`w-3.5 h-3.5 ${isSubCategorySelected ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
                        <span className="flex-1">{subCategory.title}</span>
                        {isSubCategorySelected && (
                          <span className="ml-auto text-xs bg-white/30 px-2 py-0.5 rounded-full font-semibold animate-pulse">
                            ✓
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Standalone Child Categories (if any don't have parents) */}
        {childCategories.filter(cat => !parentCategories.find(parent => parent._id === cat.parentCategory?._id)).map((category) => {
          const categorySlug = category.slug?.current
          const isCategorySelected = selectedCategory === categorySlug

          return (
            <Link
              key={category._id}
              href={categorySlug ? `/blog?category=${categorySlug}` : '/blog'}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
                ${isCategorySelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02]'
                }
              `}
            >
              <Tag className={`w-4 h-4 ${isCategorySelected ? '' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-medium">{category.title}</span>
              {isCategorySelected && (
                <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded-full font-semibold animate-pulse">
                  ✓
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
