import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShoppingBag, User as UserIcon, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { searchProducts } from '../services/api';
import { Product } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  // Debounce Search Effect
  useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
          if (searchQuery.length > 1) {
              const results = await searchProducts(searchQuery);
              setSearchResults(results.slice(0, 5)); // Limit to top 5 results
              setShowResults(true);
          } else {
              setSearchResults([]);
              setShowResults(false);
          }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle clicking outside to close search results
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
              setShowResults(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      setShowResults(false);
      setIsOpen(false); // Close mobile menu if open
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 mr-6">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-800 hidden md:block">Lumena Store</span>
              <span className="font-bold text-xl text-gray-800 md:hidden">Lumena</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`${
                    isActive('/admin')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 items-center justify-center px-6 lg:ml-6 lg:justify-end" ref={searchRef}>
             <div className="max-w-lg w-full relative">
                 <form onSubmit={handleSearchSubmit} className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Search className="h-5 w-5 text-gray-400" />
                     </div>
                     <input
                         type="text"
                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         placeholder="Search products..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         onFocus={() => { if(searchResults.length > 0) setShowResults(true); }}
                     />
                 </form>
                 {showResults && searchResults.length > 0 && (
                     <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100 max-h-96 overflow-y-auto">
                         {searchResults.map(product => (
                             <Link 
                               to={`/product/${product.id}`} 
                               key={product.id}
                               className="block px-4 py-3 hover:bg-gray-50 flex items-center border-b border-gray-50 last:border-none transition-colors"
                               onClick={() => {
                                   setShowResults(false);
                                   setSearchQuery('');
                               }}
                             >
                                 <img src={product.image} alt={product.title} className="h-10 w-10 object-cover rounded mr-3 bg-gray-100" />
                                 <div className="flex-1 min-w-0">
                                     <div className="text-sm font-medium text-gray-900 truncate">{product.title}</div>
                                     <div className="text-xs text-gray-500">${product.price.toFixed(2)}</div>
                                 </div>
                             </Link>
                         ))}
                         <button 
                              onClick={handleSearchSubmit}
                              className="w-full text-center py-2 text-xs text-indigo-600 font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
                         >
                             View all results
                         </button>
                     </div>
                 )}
             </div>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View shopping cart</span>
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth Menu */}
            <div className="hidden sm:flex sm:items-center">
              {isAuthenticated && user ? (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </button>
                  </div>
                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                         <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                         <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <span className="flex items-center">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                            </span>
                          </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                         <span className="flex items-center">
                            <LogOut className="w-4 h-4 mr-2" /> Sign out
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Log in</Link>
                   <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Sign up</Link>
                </div>
              )}
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        {/* Mobile Search */}
        <div className="p-4 border-b border-gray-200">
             <form onSubmit={handleSearchSubmit} className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                     type="text"
                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     placeholder="Search products..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                 />
             </form>
        </div>

        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`${
                isActive(link.path)
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
             <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={`${
                    isActive('/admin')
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
                Admin Dashboard
            </Link>
          )}
        </div>
        <div className="pt-4 pb-4 border-t border-gray-200">
          {isAuthenticated && user ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatar}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          ) : (
             <div className="px-4 space-y-2">
                <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                >
                    Log in
                </Link>
                <Link 
                    to="/register" 
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Sign up
                </Link>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;