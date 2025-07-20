import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="pt-16 bg-black min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-neon-green mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Order Complete!</h1>
          <p className="text-gray-300 text-lg mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-dark-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
            <div className="text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span className="text-white">#TW{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total:</span>
                <span className="text-neon-blue font-bold">${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          <span className="glow-text">Secure</span> Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-dark-200 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-dark-200 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Billing Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="md:col-span-2 p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-dark-200 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="p-4 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-neon-blue text-black font-bold py-4 rounded-xl hover:bg-neon-blue/90 transition-colors flex items-center justify-center"
              >
                <Lock className="w-5 h-5 mr-2" />
                Complete Order
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-dark-200 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={`https://picsum.photos/60/60?random=${item.id}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.name}</h3>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-neon-blue font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-600">
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
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-600">
                  <span>Total</span>
                  <span className="text-neon-blue">${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
