
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

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Categories</h3>
      </div>
      
      <div className="space-y-2">
        {/* All Posts Link */}
        <Link href="/blog" className={`
          flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
          ${!selectedCategory 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }
        `}>
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">All Posts</span>
          {!selectedCategory && (
            <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
              ✓
            </span>
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
              <div className="flex items-center">
                <Link
                  href={categorySlug ? `/blog?category=${categorySlug}` : '/blog'}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group flex-1
                    ${isCategorySelected
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">{category.title}</span>
                  {isCategorySelected && (
                    <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                      ✓
                    </span>
                  )}
                </Link>
                
                {childCats.length > 0 && (
                  <button
                    onClick={() => toggleCategory(category._id)}
                    className="p-2 text-slate-400 hover:text-white transition-colors ml-2"
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
                          flex items-center gap-3 p-2 rounded-lg transition-all duration-300 group text-sm
                          ${isSubCategorySelected
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'text-slate-400 hover:bg-white/10 hover:text-white'
                          }
                        `}
                      >
                        <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        <span>{subCategory.title}</span>
                        {isSubCategorySelected && (
                          <span className="ml-auto text-xs text-purple-300 bg-purple-500/30 px-2 py-1 rounded-full">
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
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Tag className="w-4 h-4" />
              <span className="font-medium">{category.title}</span>
              {isCategorySelected && (
                <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
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
