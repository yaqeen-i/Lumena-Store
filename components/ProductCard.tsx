import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-90 h-64 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
           ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`${
                    product.rating.rate > rating ? 'text-yellow-400 fill-current' : 'text-gray-200'
                  } h-4 w-4 flex-shrink-0`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-1 text-xs text-gray-500">({product.rating.count})</p>
          </div>
        </div>
        <div className="mt-4">
            <button
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation to product details
                    addToCart(product);
                }}
                className="w-full relative z-10 flex items-center justify-center bg-gray-900 border border-transparent rounded-md py-2 px-8 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
