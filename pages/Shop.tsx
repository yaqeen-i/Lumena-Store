import React, { useEffect, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { getProducts, getAllCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const init = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setCategories(getAllCategories());
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop Products</h1>
            {searchQuery && (
                <p className="text-gray-500 mt-2 flex items-center">
                    <Search className="w-4 h-4 mr-1" />
                    Showing results for <span className="font-semibold text-gray-900 ml-1">"{searchQuery}"</span>
                </p>
            )}
        </div>
        <button 
            className="mt-4 md:mt-0 md:hidden flex items-center text-gray-600"
            onClick={() => setShowFilters(!showFilters)}
        >
            <Filter className="w-5 h-5 mr-2" /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded-md text-sm capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
            {loading ? (
                <div className="flex justify-center h-64 items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 font-medium text-lg">No products found</p>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Shop;