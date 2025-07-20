import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const cartItemsCount = getCartItemsCount();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-neon-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-0">
            <motion.img
              src="/logo.png"
              alt="Twirlshop Logo"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 object-contain filter drop-shadow-lg"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Pacifico, cursive', marginTop: '-2px' }}
            >
              Twirlshop
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-neon-blue'
                    : 'text-gray-300 hover:text-neon-blue'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-300 hover:text-neon-blue transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Profile Icon */}
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-300 hover:text-neon-blue transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.div>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-300 hover:text-neon-blue transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-neon-pink text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Login Button */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00FFFF' }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-4 py-2 bg-transparent border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300"
              >
                Sign In
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-neon-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 }
          }}
          className="md:hidden overflow-hidden bg-dark-200 rounded-lg mt-2"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-neon-blue bg-dark-300'
                    : 'text-gray-300 hover:text-neon-blue hover:bg-dark-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 text-neon-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
