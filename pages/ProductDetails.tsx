import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const data = await getProductById(parseInt(id));
      if (!data) {
          // Handle not found
          navigate('/shop');
          return;
      }
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading || !product) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse">
          <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`${
                    product.rating.rate > rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  } h-5 w-5 flex-shrink-0`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">{product.rating.count} reviews</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700 space-y-6">{product.description}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
             <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>

          <section className="mt-8 border-t border-gray-200 pt-8">
             <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                 <div className="flex items-start">
                     <div className="flex-shrink-0">
                         <Truck className="h-6 w-6 text-indigo-500" />
                     </div>
                     <div className="ml-3 text-sm">
                         <p className="font-medium text-gray-900">Fast Delivery</p>
                         <p className="text-gray-500">Get it within 2-3 business days.</p>
                     </div>
                 </div>
                 <div className="flex items-start">
                     <div className="flex-shrink-0">
                         <ShieldCheck className="h-6 w-6 text-indigo-500" />
                     </div>
                     <div className="ml-3 text-sm">
                         <p className="font-medium text-gray-900">Buyer Protection</p>
                         <p className="text-gray-500">Guaranteed authentic & free returns.</p>
                     </div>
                 </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
