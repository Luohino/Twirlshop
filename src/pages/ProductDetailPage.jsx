import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  if (!product) {
    return (
      <div className="pt-16 bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $99'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Shield,
      title: 'Warranty',
      description: '2-year manufacturer warranty'
    }
  ];

  // Mock images using the product's image data or generate unique ones
  const images = product.images && product.images.length > 0 
    ? product.images.map((img, idx) => `https://picsum.photos/600/600?random=${product.id}-${idx}`)
    : [`https://picsum.photos/600/600?random=${product.id}`, `https://picsum.photos/600/600?random=${product.id}-2`];

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <motion.div 
              className="relative bg-dark-200 rounded-2xl overflow-hidden mb-4"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.trending && (
                <div className="absolute top-4 left-4 bg-neon-pink text-black px-3 py-1 text-sm font-bold rounded-full">
                  TRENDING
                </div>
              )}
              {product.originalPrice > product.price && (
                <div className="absolute top-4 right-4 bg-neon-green text-black px-3 py-1 text-sm font-bold rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </motion.div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-neon-blue' : 'border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-neon-blue font-medium uppercase tracking-wide text-sm">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-neon-blue">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-white hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-white bg-dark-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-white hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                  product.inStock
                    ? 'bg-neon-blue text-black hover:bg-neon-blue/90'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-600 text-gray-300 rounded-xl hover:border-neon-blue hover:text-neon-blue transition-colors"
              >
                <Heart className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-600 text-gray-300 rounded-xl hover:border-neon-blue hover:text-neon-blue transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-neon-blue/10 rounded-lg">
                    <benefit.icon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <span className="text-white font-medium">{benefit.title}</span>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">
            Related <span className="glow-text">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-dark-200 rounded-xl overflow-hidden border border-gray-700 hover:border-neon-blue/50 transition-colors"
                  >
                    <img
                      src={`https://picsum.photos/300/300?random=${relatedProduct.id}`}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-neon-blue font-bold">${relatedProduct.price}</span>
                        <span className="text-yellow-400">★ {relatedProduct.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
