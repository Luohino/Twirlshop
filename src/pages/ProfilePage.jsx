import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, MapPin, CreditCard } from 'lucide-react';
import userData from '../data/user.json';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="pt-16 bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-neon-green';
      case 'processing': return 'text-yellow-400';
      case 'shipped': return 'text-neon-blue';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-200 rounded-2xl p-6">
              {/* User Info */}
              <div className="text-center mb-8">
                <img
                  src={`https://picsum.photos/100/100?random=avatar`}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since {new Date(user.joinDate).getFullYear()}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-neon-blue text-black'
                        : 'text-gray-300 hover:bg-dark-300 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-dark-200 rounded-2xl p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Phone</label>
                      <input
                        type="text"
                        placeholder="Not provided"
                        className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors">
                    Update Profile
                  </button>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-300 rounded-xl p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-white font-semibold">Order {order.id}</h3>
                            <p className="text-gray-400 text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="text-neon-blue font-bold">${order.total}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-300">{item.name} x{item.quantity}</span>
                              <span className="text-white">${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Wishlist</h2>
                  <div className="text-center py-20">
                    <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-400">Start adding products you love to your wishlist</p>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Saved Addresses</h2>
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="bg-dark-300 rounded-xl p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-semibold flex items-center">
                              {address.type}
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-neon-blue text-black px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </h3>
                            <p className="text-gray-400 mt-2">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-neon-blue hover:text-neon-blue/80 text-sm">
                              Edit
                            </button>
                            <button className="text-red-400 hover:text-red-300 text-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors">
                    Add New Address
                  </button>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-dark-300 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 accent-neon-blue" defaultChecked />
                          <span className="text-gray-300">Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 accent-neon-blue" defaultChecked />
                          <span className="text-gray-300">Marketing emails</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 accent-neon-blue" />
                          <span className="text-gray-300">SMS notifications</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="bg-dark-300 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 accent-neon-blue" defaultChecked />
                          <span className="text-gray-300">Make profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 accent-neon-blue" />
                          <span className="text-gray-300">Allow data collection for personalization</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-dark-300 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                      <div className="space-y-4">
                        <button className="text-neon-blue hover:text-neon-blue/80">
                          Change Password
                        </button>
                        <br />
                        <button className="text-neon-blue hover:text-neon-blue/80">
                          Enable Two-Factor Authentication
                        </button>
                        <br />
                        <button className="text-red-400 hover:text-red-300">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
