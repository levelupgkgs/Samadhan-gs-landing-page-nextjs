import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/sanity';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
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
import type { Category } from '@shared/sanity-schemas';

interface CategorySidebarProps {
  onSelectCategory: (slug?: string) => void;
  selectedCategorySlug?: string;
}

export default function CategorySidebar({ onSelectCategory, selectedCategorySlug }: CategorySidebarProps) {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-3/4 animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full backdrop-blur-sm bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <CardContent className="p-6 text-center">
          <Filter className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600 dark:text-red-400 font-medium">Error loading categories</p>
        </CardContent>
      </Card>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Card className="w-full backdrop-blur-sm bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 text-center">
          <Layers className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-blue-600 dark:text-blue-400 font-medium">No categories found</p>
        </CardContent>
      </Card>
    );
  }

  const topLevelCategories = categories.filter((cat: Category) => !cat.parentCategory);
  const subCategories = categories.filter((cat: Category) => cat.parentCategory);

  const getSubCategories = (parentId: string) => {
    return subCategories.filter((subCat: Category) => subCat.parentCategory?._id === parentId);
  };

  // Get appropriate icon for category
  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('exam') || lowerTitle.includes('test')) return GraduationCap;
    if (lowerTitle.includes('study') || lowerTitle.includes('preparation')) return BookOpen;
    if (lowerTitle.includes('strategy') || lowerTitle.includes('tips')) return Target;
    if (lowerTitle.includes('trending') || lowerTitle.includes('popular')) return TrendingUp;
    return Layers;
  };

  return (
    <Card className="w-full sticky top-6 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4 border-b border-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
        <CardTitle className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          <Filter className="w-6 h-6 text-blue-500" />
          Explore Categories
          <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 py-6 space-y-2">
        {/* All Blogs Button */}
        <Button
          variant={!selectedCategorySlug ? "default" : "ghost"}
          className={`w-full justify-start h-12 text-left group transition-all duration-300 ${
            !selectedCategorySlug 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl' 
              : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
          onClick={() => onSelectCategory(undefined)}
        >
          <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium">All Blog Posts</span>
          {!selectedCategorySlug && (
            <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-0">
              Active
            </Badge>
          )}
        </Button>

        <div className="pt-2">
          <Accordion type="multiple" className="w-full space-y-2">
            {topLevelCategories.map((category: Category) => {
              const IconComponent = getCategoryIcon(category.title);
              const isSelected = selectedCategorySlug === category.slug?.current;
              const hasSubCategories = getSubCategories(category._id).length > 0;
              
              return (
                <AccordionItem 
                  key={category._id} 
                  value={category._id}
                  className="border border-gray-100 dark:border-gray-700 rounded-lg bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/10 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                >
                  <AccordionTrigger
                    className={`px-4 py-3 hover:no-underline group ${
                      isSelected ? 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30' : ''
                    }`}
                    onClick={(e) => {
                      if (!hasSubCategories || selectedCategorySlug !== category.slug?.current) {
                        onSelectCategory(category.slug?.current);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <IconComponent className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                        isSelected ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      <span className="font-semibold text-sm">{category.title}</span>
                      {isSelected && (
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  
                  {hasSubCategories && (
                    <AccordionContent className="px-2 pb-3 overflow-hidden">
                      <div className="space-y-1 border-l-2 border-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 ml-2">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start h-10 text-sm group transition-all duration-200 ${
                            selectedCategorySlug === category.slug?.current 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-sm' 
                              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => onSelectCategory(category.slug?.current)}
                        >
                          <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          <span>All {category.title}</span>
                        </Button>
                        
                        {getSubCategories(category._id).map((subCategory: Category) => {
                          const isSubCategorySelected = selectedCategorySlug === subCategory.slug?.current;
                          let subCategoryClasses = `w-full justify-start h-10 text-sm group transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700`;
                          if (isSubCategorySelected) {
                            subCategoryClasses = 'w-full justify-start h-10 text-sm group transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-sm';
                          }

                          return (
                            <Button
                              key={subCategory._id}
                              variant="ghost"
                              className={subCategoryClasses}
                              onClick={() => onSelectCategory(subCategory.slug?.current)}
                            >
                              <ChevronRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                              <span>{subCategory.title}</span>
                              {isSubCategorySelected && (
                                <Badge variant="outline" className="ml-auto text-xs border-white/30 text-white bg-white/20">
                                  ✓
                                </Badge>
                              )}
                            </Button>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
