import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import productsData from '../data/products.json';

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const heroRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const productsRef = useScrollReveal();

  useEffect(() => {
    // Get trending products
    const trending = productsData.filter(product => product.trending).slice(0, 8);
    setTrendingProducts(trending);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience the future with our quantum-speed delivery system.'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Advanced encryption protects your data with military-grade security.'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free shipping on all orders over $99 with our drone delivery network.'
    }
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://picsum.photos/400/300?random=electronics',
      count: '50+ Products'
    },
    {
      name: 'Fashion',
      image: 'https://picsum.photos/400/300?random=fashion',
      count: '30+ Products'
    },
    {
      name: 'Accessories',
      image: 'https://picsum.photos/400/300?random=accessories',
      count: '25+ Products'
    }
  ];

  return (
    <div className="pt-16 bg-black">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-neon-blue/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Discover the Future</span>
              <br />
              <span className="text-white">of Shopping</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience next-generation products with cutting-edge technology and innovative design
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 bg-neon-blue text-black text-lg font-semibold rounded-xl btn-glow"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <Link to={`/categories/${category.name.toLowerCase()}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-300">{category.count}</p>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-neon-blue rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text-alt">Twirlshop</span>?
            </h2>
            <p className="text-xl text-gray-300">Experience the future of online shopping</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 glass-effect rounded-2xl hover:bg-white/20 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-blue rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section ref={productsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="gradient-text">Trending</span> Products
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover what's hot in the futuristic marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-black transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the <span className="gradient-text-alt">Future</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of customers who have already discovered tomorrow's technology today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="px-8 py-4 bg-neon-blue text-black font-semibold rounded-xl hover:bg-neon-blue/90 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border border-neon-blue text-neon-blue font-semibold rounded-xl hover:bg-neon-blue hover:text-black transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
