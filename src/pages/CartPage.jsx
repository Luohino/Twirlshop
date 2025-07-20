import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover amazing futuristic products and add them to your cart
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">
            Shopping <span className="text-neon-blue">Cart</span>
          </h1>
          <Link
            to="/shop"
            className="flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-dark-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Cart Items ({cart.length})</h2>
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${Math.random()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-4 p-4 bg-dark-300 rounded-xl"
                  >
                    <img
                      src={`https://picsum.photos/80/80?random=${item.id}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                      <p className="text-neon-blue font-bold">${item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-dark-200 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-neon-green">Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-neon-blue">${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-neon-blue text-black font-semibold py-4 rounded-xl hover:bg-neon-blue/90 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Free shipping on all orders over $99
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
