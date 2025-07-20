import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Grid3X3, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
  ];

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Shop <span className="text-neon-blue">Futuristic</span> Products
          </h1>
          <p className="text-gray-300 text-lg">
            Discover cutting-edge technology and innovative designs
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex bg-dark-200 border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 ${viewMode === 'grid' ? 'bg-neon-blue text-black' : 'text-gray-300'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 ${viewMode === 'list' ? 'bg-neon-blue text-black' : 'text-gray-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-neon-blue text-black rounded-lg hover:bg-neon-blue/90 transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={false}
            animate={{
              width: showFilters ? 280 : 0,
              opacity: showFilters ? 1 : 0
            }}
            className="overflow-hidden"
          >
            <div className="bg-dark-200 rounded-xl p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category || (category === 'All' && !selectedCategory)}
                        onChange={(e) => setSelectedCategory(e.target.value === 'All' ? '' : e.target.value)}
                        className="text-neon-blue focus:ring-neon-blue"
                      />
                      <span className="ml-2 text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-neon-blue"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
                <label className="flex items-center">
                  <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                  <span className="ml-2 text-gray-300">In Stock Only</span>
                </label>
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-300">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-200 rounded-xl p-6 flex gap-6 items-center border border-gray-700 hover:border-neon-blue/50 transition-colors"
                  >
                    <img
                      src={`https://picsum.photos/150/150?random=${product.id}`}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-neon-blue">${product.price}</span>
                        <span className="text-yellow-400">★ {product.rating}</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors">
                      Add to Cart
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
