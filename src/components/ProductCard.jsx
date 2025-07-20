import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="card-glow rounded-xl overflow-hidden">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-dark-300">
            <img
              src={`https://picsum.photos/300/300?random=${product.id}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Trending Badge */}
            {product.trending && (
              <div className="absolute top-3 left-3 bg-neon-pink text-black px-2 py-1 text-xs font-bold rounded-full">
                TRENDING
              </div>
            )}
            
            {/* Discount Badge */}
            {product.originalPrice > product.price && (
              <div className="absolute top-3 right-3 bg-neon-green text-black px-2 py-1 text-xs font-bold rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-3 bg-neon-blue text-black rounded-full hover:bg-neon-blue/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white font-bold text-lg">OUT OF STOCK</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs text-neon-blue font-medium uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-neon-blue">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {product.inStock && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-neon-blue text-black text-sm font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors"
                >
                  Add to Cart
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
