import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import productsData from '../data/products.json';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
    );
  }, [query]);

  if (!open) return null;

  // Recommended: top 5 trending or random products
  const recommended = productsData.filter(p => p.trending).slice(0, 5);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} style={{ zIndex: 0 }} />
      <div
        className="fixed left-1/2 top-24 transform -translate-x-1/2 max-w-xl w-[95vw] bg-dark-200 rounded-2xl border border-neon-blue p-6 animate-fade-in shadow-[0_0_40px_10px_rgba(0,102,255,0.5)]"
        style={{
          maxHeight: 'calc(100vh - 8rem)',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-neon-blue" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="flex-1 bg-transparent outline-none text-white text-xl font-futuristic placeholder-gray-400"
            style={{ fontFamily: 'Orbitron, monospace' }}
          />
        </div>
        {query.trim() === '' ? (
          <div>
            <div className="text-gray-400 mb-2 text-sm">Recommended for you</div>
            <div className="grid grid-cols-1 gap-3">
              {recommended.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 bg-dark-300 rounded-lg p-3 hover:bg-dark-400 transition-colors no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  <img src={`https://picsum.photos/60/60?random=${product.id}`} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-white font-semibold" style={{ fontFamily: 'Orbitron, monospace' }}>{product.name}</div>
                    <div className="text-neon-blue text-xs">{product.category}</div>
                  </div>
                  <div className="text-neon-blue font-bold">${product.price}</div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {results.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No results found.</div>
            ) : (
              <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
                {results.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 bg-dark-300 rounded-lg p-3 hover:bg-dark-400 transition-colors no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <img src={`https://picsum.photos/60/60?random=${product.id}`} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-white font-semibold" style={{ fontFamily: 'Orbitron, monospace' }}>{product.name}</div>
                      <div className="text-neon-blue text-xs">{product.category}</div>
                    </div>
                    <div className="text-neon-blue font-bold">${product.price}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default SearchModal; 