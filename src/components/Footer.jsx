import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const footerLinks = {
    Shop: [
      { name: 'Electronics', href: '/categories/electronics' },
      { name: 'Fashion', href: '/categories/fashion' },
      { name: 'Accessories', href: '/categories/accessories' },
      { name: 'New Arrivals', href: '/shop?sort=newest' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
    Legal: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="bg-black border-t border-neon-blue/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold glow-text"
              >
                Twirlshop
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Discover the Future of Shopping with cutting-edge technology and innovative products.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: '#00FFFF' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-neon-blue mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">Stay Connected</h3>
              <p className="text-gray-400">Get the latest updates on new products and exclusive offers.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-dark-200 border border-gray-700 rounded-l-lg focus:outline-none focus:border-neon-blue text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00FFFF' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-neon-blue text-black font-semibold rounded-r-lg hover:bg-neon-blue/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 Twirlshop. All rights reserved. <span className="text-neon-blue">by Luohino</span>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-neon-blue text-sm">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-neon-blue text-sm">
                Privacy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-neon-blue text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
