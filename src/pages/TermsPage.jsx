import { motion } from 'framer-motion';

const TermsPage = () => {
  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">
            Terms & <span className="glow-text">Conditions</span>
          </h1>
          
          <div className="bg-dark-200 rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Twirlshop, you accept and agree to be bound by the terms 
                and provision of this agreement. These Terms of Service apply to all users of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">2. Use License</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of Twirlshop materials 
                for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">3. Products and Services</h2>
              <p className="text-gray-300 leading-relaxed">
                Twirlshop offers futuristic and innovative products. All product descriptions, 
                images, and specifications are provided for informational purposes and may be 
                subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">4. Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, 
                use, and protect your information when you use our service. By using our service, 
                you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">5. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                Payment is required at the time of purchase. We accept major credit cards and 
                digital payment methods. All transactions are processed securely using industry-standard 
                encryption protocols.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">6. Shipping and Returns</h2>
              <p className="text-gray-300 leading-relaxed">
                We offer free shipping on orders over $99. Returns are accepted within 30 days 
                of purchase for unused items in original packaging. Refunds will be processed 
                within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">7. Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed">
                The materials on Twirlshop are provided on an 'as is' basis. Twirlshop makes 
                no warranties, expressed or implied, and hereby disclaims and negates all other 
                warranties including without limitation, implied warranties or conditions of 
                merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">8. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-300">
                <p>Email: support@twirlshop.com</p>
                <p>Phone: 1-800-TWIRL-SHOP</p>
                <p>Address: 123 Future Lane, Neo City, CA 90210</p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-600">
              <p className="text-gray-400 text-sm">
                Last updated: July 19, 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
