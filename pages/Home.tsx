import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Product } from '../types';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const products = await getProducts();
      // Just 4 random products for "Featured"
      setFeaturedProducts(products.slice(0, 4));
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Style Meets Substance
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover our curated collection of premium products designed to elevate your lifestyle. 
            From cutting-edge electronics to sustainable fashion.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Shop Collection
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:gap-x-8">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Free Shipping</h3>
                <p className="mt-2 text-base text-gray-500">On all orders over $100. Global delivery available.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">2-Year Warranty</h3>
                <p className="mt-2 text-base text-gray-500">Shop with confidence. We stand by our quality.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
                <p className="mt-2 text-base text-gray-500">Our team is here to help you, anytime, anywhere.</p>
            </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Now</h2>
            <Link to="/shop" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
