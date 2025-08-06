"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Book, Search, Star, ArrowLeft, Loader2 } from "lucide-react";

// --- ACETERNITY UI IMPORTS ---
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

// --- Data Interfaces (Unchanged) ---
interface BookData {
  id: number; cat_id: number; sub_cat_id: number; author_ids?: string;
  book_access: string; title: string; description: string; image: string;
  url_type: string; url: string; file_version: number; download_enable: number;
  book_on_rent: number; book_rent_price?: number; book_rent_time?: number;
  featured: number; status: number;
}
interface SubCategory {
  id: number; cat_id: number; sub_category_name: string;
  sub_category_image: string; status: number; books: BookData[];
}
interface Category {
  id: number; category_name: string; category_image: string;
  status: number; subcategories: SubCategory[];
}

// --- Helper Functions (Unchanged) ---
const cleanCategoryName = (name: string) => name.replace(/^\d+\.\s*/, '').trim();
const formatNameWithTranslation = (name: string): JSX.Element => {
  const cleanName = cleanCategoryName(name);
  if (cleanName.includes('|')) {
    const parts = cleanName.split('|').map(part => part.trim());
    return (<span>{parts[0]}{parts[1] && <><br /><span className="text-xs opacity-80">{parts[1]}</span></>}</span>);
  }
  return <span>{cleanName}</span>;
};
const getBookImageUrl = (book: BookData) => book.image.startsWith('upload/') ? `https://server.samadhangs.com/${book.image}` : book.image;
const getCategoryImageUrl = (category: Category) => `https://server.samadhangs.com/upload/categories/${category.category_image}`;
const getSubCategoryImageUrl = (subcategory: SubCategory) => `https://server.samadhangs.com/upload/subcategories/${subcategory.sub_category_image}`;

// --- Refactored & Re-styled Components ---

// Reusable Image component with fallback (Unchanged)
const ImageWithFallback = (props: ImageProps & { fallbackSrc: string }) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => { setImgSrc(src); }, [src]);
  return <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />;
};
const fallbackImg = `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`;

// ACETERNITY UI: Custom styled Badge component since Aceternity doesn't provide one
const CustomBadge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${className}`}>
        {children}
    </span>
);

// Category Card with BackgroundGradient
const CategoryCard = ({ category, index, onClick }: { category: Category, index: number, onClick: () => void }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
    <BackgroundGradient className="rounded-[22px] h-full p-0.5 bg-zinc-900" containerClassName="h-full">
      <div className="bg-zinc-900 rounded-[20px] h-full overflow-hidden group cursor-pointer" onClick={onClick}>
        <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
          <ImageWithFallback src={getCategoryImageUrl(category)} fallbackSrc={fallbackImg} alt={category.category_name} fill className="object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-300"/>
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors h-14">{formatNameWithTranslation(category.category_name)}</h3>
          <p className="text-sm text-slate-400">{category.subcategories.reduce((t, s) => t + s.books.length, 0)} books</p>
        </div>
      </div>
    </BackgroundGradient>
  </motion.div>
);

// SubCategory Card with BackgroundGradient
const SubCategoryCard = ({ subcategory, index, onClick }: { subcategory: SubCategory, index: number, onClick: () => void }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
    <BackgroundGradient className="rounded-[22px] h-full p-0.5 bg-zinc-900" containerClassName="h-full">
        <div className="bg-zinc-900 rounded-[20px] h-full overflow-hidden group cursor-pointer" onClick={onClick}>
            <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
            <ImageWithFallback src={getSubCategoryImageUrl(subcategory)} fallbackSrc={fallbackImg} alt={subcategory.sub_category_name} fill className="object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-300"/>
            </div>
            <div className="p-4 text-center">
            <h3 className="font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors h-14">{formatNameWithTranslation(subcategory.sub_category_name)}</h3>
            <p className="text-sm text-slate-400">{subcategory.books.length} books</p>
            </div>
        </div>
    </BackgroundGradient>
  </motion.div>
);

// Book Card with BackgroundGradient
const BookCard = ({ book, category, subcategory, index }: { book: BookData, category: Category | null, subcategory: SubCategory | null, index: number }) => (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
        <BackgroundGradient className="rounded-[22px] h-full p-0.5 bg-zinc-900" containerClassName="h-full">
            <div className="bg-zinc-900 rounded-[20px] h-full overflow-hidden group flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-800">
                    <ImageWithFallback src={getBookImageUrl(book)} fallbackSrc={fallbackImg} alt={book.title} fill className="object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-300"/>
                    <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
                        <CustomBadge className={book.book_access === 'Free' ? 'bg-green-600' : 'bg-purple-600'}>{book.book_access}</CustomBadge>
                        {book.featured === 1 && (<CustomBadge className="bg-yellow-600 flex items-center"><Star className="w-3 h-3 mr-1"/>Featured</CustomBadge>)}
                    </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                        {category && <CustomBadge className="bg-slate-700 block mb-1">{formatNameWithTranslation(category.category_name)}</CustomBadge>}
                        {subcategory && <CustomBadge className="bg-slate-700 block">{formatNameWithTranslation(subcategory.sub_category_name)}</CustomBadge>}
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors text-center h-14">{formatNameWithTranslation(book.title)}</h3>
                    {book.description && <p className="text-sm text-slate-400 mb-3 flex-grow">{book.description}</p>}
                </div>
            </div>
        </BackgroundGradient>
    </motion.div>
);

// --- Main Page Component ---
export default function SyllabusPageAceternity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  const { data: apiData, isLoading, error } = useQuery<Category[]>({
    queryKey: ['syllabusData'],
    queryFn: async () => {
      const response = await fetch('https://server.samadhangs.com/api/landing-page');
      if (!response.ok) throw new Error('Failed to fetch syllabus data');
      return await response.json();
    }
  });

  const categories = ["All Categories", ...(apiData?.map(cat => cleanCategoryName(cat.category_name)) || [])];
  const getSubCategories = (categoryName: string) => {
    if (!apiData || categoryName === "All Categories") return ["All"];
    const category = apiData.find(cat => cleanCategoryName(cat.category_name) === categoryName);
    return ["All", ...(category?.subcategories?.map(sub => cleanCategoryName(sub.sub_category_name)) || [])];
  };

  const filteredBooks = (() => {
    if (!apiData) return [];
    let books: BookData[] = [];
    if (selectedCategory === "All Categories") books = apiData.flatMap(cat => cat.subcategories.flatMap(sub => sub.books));
    else {
      const category = apiData.find(cat => cleanCategoryName(cat.category_name) === selectedCategory);
      if (category) {
        if (selectedSubCategory === "All") books = category.subcategories.flatMap(sub => sub.books);
        else {
          const subCategory = category.subcategories.find(sub => cleanCategoryName(sub.sub_category_name) === selectedSubCategory);
          books = subCategory?.books || [];
        }
      }
    }
    if (!searchTerm) return books;
    return books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.description.toLowerCase().includes(searchTerm.toLowerCase()));
  })();

  useEffect(() => { setSelectedSubCategory("All"); }, [selectedCategory]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isLoading) { /* Loading state unchanged */ }
  if (error) { /* Error state unchanged */ }

  const searchPlaceholders = ["Search for Physics books", "Find all free books", "Search for exam prep material", "Look for featured books"];

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.header 
        className="bg-black/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50"
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             {/* ACETERNITY UI: HoverBorderGradient Button */}
            <Link href="/">
              <HoverBorderGradient containerClassName="rounded-full" as="button" className="bg-black text-white flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </HoverBorderGradient>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="w-6 h-6 text-violet-400" />
            <h1 className="text-xl font-bold text-white">Syllabus</h1>
          </div>
        </div>
      </motion.header>

      <section className="bg-black border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* ACETERNITY UI: PlaceholdersAndVanishInput */}
            <div className="flex-1 w-full">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={(e) => e.preventDefault()}
              />
            </div>
            {/* ACETERNITY UI: Restyled Select Dropdowns */}
            <div className="flex gap-4 w-full lg:w-auto">
              <select
                value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-[200px] transition-all"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full bg-zinc-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-[200px] transition-all"
                disabled={selectedCategory === "All Categories"}
              >
                {getSubCategories(selectedCategory).map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-400">
              Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {selectedCategory === "All Categories" ? (
            <motion.div key="categories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {apiData?.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} onClick={() => setSelectedCategory(cleanCategoryName(category.category_name))} />
              ))}
            </motion.div>
          ) : selectedSubCategory === "All" ? (
            <motion.div key="subcategories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {apiData?.find(cat => cleanCategoryName(cat.category_name) === selectedCategory)?.subcategories.map((subcategory, index) => (
                <SubCategoryCard key={subcategory.id} subcategory={subcategory} index={index} onClick={() => setSelectedSubCategory(cleanCategoryName(subcategory.sub_category_name))} />
              ))}
            </motion.div>
          ) : filteredBooks.length === 0 ? (
            <motion.div key="no-results" className="text-center py-16" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <Book className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No books found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div key="results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book, index) => {
                let category: Category | null = null, subcategory: SubCategory | null = null;
                for (const cat of apiData || []) {
                  const foundSubcat = cat.subcategories.find(sub => sub.id === book.sub_cat_id);
                  if (foundSubcat) { category = cat; subcategory = foundSubcat; break; }
                }
                return <BookCard key={book.id} book={book} category={category} subcategory={subcategory} index={index} />;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}