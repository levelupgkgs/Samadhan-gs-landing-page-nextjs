'use client'
import React from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  BookOpen, 
  Layers, 
  ChevronRight, 
  Filter, 
  Sparkles,
  GraduationCap,
  Target,
  TrendingUp
} from 'lucide-react';

export default function BlogSidebar({ categories }) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const parentCategories = categories.filter(c => !c.parentCategory)
  const subCategories = (parentId) => categories.filter(c => c.parentCategory?._id === parentId)

  const getCategoryIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('exam') || lowerTitle.includes('test')) return GraduationCap;
    if (lowerTitle.includes('study') || lowerTitle.includes('preparation')) return BookOpen;
    if (lowerTitle.includes('strategy') || lowerTitle.includes('tips')) return Target;
    if (lowerTitle.includes('trending') || lowerTitle.includes('popular')) return TrendingUp;
    return Layers;
  };

  return (
    <div className="w-full sticky top-6 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          <Filter className="w-6 h-6 text-blue-500" />
          Explore Categories
          <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
        </h3>
      </div>
      
      <div className="p-4 space-y-2">
        <Link href="/blog">
          <div className={`w-full flex items-center p-3 h-12 text-left group transition-all duration-300 rounded-lg ${
            !activeCategory 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}>
            <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">All Blog Posts</span>
            {!activeCategory && (
              <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
        </Link>

        <div className="pt-2">
          {parentCategories.map((category) => {
            const IconComponent = getCategoryIcon(category.title);
            const isSelected = activeCategory === category.slug?.current;
            const hasSubCategories = subCategories(category._id).length > 0;
            
            return (
              <div key={category._id} className="mb-2">
                <Link href={`/blog?category=${category.slug?.current}`}>
                  <div className={`flex items-center p-3 group rounded-lg transition-colors ${
                    isSelected ? 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <IconComponent className={`w-5 h-5 mr-3 group-hover:scale-110 transition-transform ${
                      isSelected ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                    }`} />
                    <span className="font-semibold text-sm">{category.title}</span>
                    {isSelected && (
                      <span className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </Link>
                
                {hasSubCategories && (
                  <div className="pl-6 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
                    {subCategories(category._id).map((subCategory) => {
                      const isSubCategorySelected = activeCategory === subCategory.slug?.current;
                      return (
                        <Link key={subCategory._id} href={`/blog?category=${subCategory.slug?.current}`}>
                          <div className={`flex items-center p-2 group rounded-lg transition-colors text-sm ${
                            isSubCategorySelected ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-sm' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}>
                            <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            <span>{subCategory.title}</span>
                            {isSubCategorySelected && (
                              <span className="ml-auto text-xs border-white/30 text-white bg-white/20 px-2 py-1 rounded-full">
                                ✓
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
