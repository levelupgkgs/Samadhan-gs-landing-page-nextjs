
'use client'
import React from 'react';
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Layers, 
  ChevronRight, 
  Filter, 
  Sparkles,
  GraduationCap,
  Target,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  parentCategory?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
}

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory?: string;
}

export default function BlogSidebar({ categories, selectedCategory }: BlogSidebarProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);
  const router = useRouter();

  const parentCategories = categories?.filter(c => !c.parentCategory) || [];
  const getSubCategories = (parentId: string) => categories?.filter(c => c.parentCategory?._id === parentId) || [];

  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('exam') || lowerTitle.includes('test')) return GraduationCap;
    if (lowerTitle.includes('study') || lowerTitle.includes('preparation')) return BookOpen;
    if (lowerTitle.includes('strategy') || lowerTitle.includes('tips')) return Target;
    if (lowerTitle.includes('trending') || lowerTitle.includes('popular')) return TrendingUp;
    return Layers;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/blog?category=${categorySlug}`);
  };

  return (
    <div className="w-full sticky top-6 bg-white/10 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <div className="p-6 border-b border-white/10">
        <h3 className="flex items-center gap-3 text-xl font-bold text-white">
          <Filter className="w-6 h-6 text-blue-400" />
          Explore Categories
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </h3>
      </div>
      
      <div className="p-6 space-y-3">
        {/* All Posts */}
        <button
          onClick={() => router.push('/blog')}
          className={`w-full flex items-center p-4 h-14 text-left group transition-all duration-300 rounded-xl ${
            !selectedCategory 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl' 
              : 'hover:bg-white/10 text-gray-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium">All Articles</span>
          {!selectedCategory && (
            <span className="ml-auto bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Active
            </span>
          )}
        </button>

        <div className="pt-2 space-y-2">
          {parentCategories.map((category) => {
            const IconComponent = getCategoryIcon(category.title);
            const isSelected = selectedCategory === category.slug?.current;
            const subCategories = getSubCategories(category._id);
            const hasSubCategories = subCategories.length > 0;
            const isExpanded = expandedCategories.includes(category._id);
            
            return (
              <div key={category._id} className="mb-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleCategoryClick(category.slug?.current)}
                    className={`flex-1 flex items-center p-3 group rounded-xl transition-colors ${
                      isSelected 
                        ? 'text-blue-300 bg-blue-500/20 border border-blue-500/30' 
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mr-3 group-hover:scale-110 transition-transform ${
                      isSelected ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                    <span className="font-semibold text-sm">{category.title}</span>
                    {isSelected && (
                      <span className="ml-auto bg-blue-500/30 text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                  
                  {hasSubCategories && (
                    <button
                      onClick={() => toggleCategory(category._id)}
                      className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
                
                {hasSubCategories && isExpanded && (
                  <div className="pl-6 mt-2 space-y-1 border-l-2 border-white/20">
                    {subCategories.map((subCategory) => {
                      const isSubCategorySelected = selectedCategory === subCategory.slug?.current;
                      return (
                        <button
                          key={subCategory._id}
                          onClick={() => handleCategoryClick(subCategory.slug?.current)}
                          className={`w-full flex items-center p-3 group rounded-xl transition-colors text-sm ${
                            isSubCategorySelected 
                              ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30' 
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          <span>{subCategory.title}</span>
                          {isSubCategorySelected && (
                            <span className="ml-auto text-xs text-purple-300 bg-purple-500/30 px-2 py-1 rounded-full">
                              ✓
                            </span>
                          )}
                        </button>
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
