import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const uniqueCategories = [...new Set(productsData.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Browse by <span className="text-neon-blue">Categories</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-dark-200 rounded-xl overflow-hidden border border-gray-700 hover:border-neon-blue/50 transition-colors"
            >
              <div className="relative h-56">
                <img
                  src={`https://picsum.photos/300/200?random=${category}`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                  <p className="text-white text-lg font-bold p-4">{category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
