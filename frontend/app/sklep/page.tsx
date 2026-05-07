'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '../lib/product';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/products", {
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.content || []);
      }
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/cart/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        alert("✅ Dodano do koszyka!");
      } else {
        alert("❌ Zaloguj się, aby dodać produkt do koszyka");
      }
    } catch (error) {
      console.error("Błąd dodawania do koszyka:", error);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest
        break;
    }

    return filtered;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = filterAndSortProducts();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2">🛍️ Katalog produktów</h1>
          <p className="text-blue-100">Odkryj pełną ofertę naszego sklepu</p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* SEARCH */}
            <div>
              <input
                type="text"
                placeholder="🔍 Wyszukaj produkt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-gray-500 focus:ring-2 ring-blue-500 outline-none transition"
              />
            </div>

            {/* SORT */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 ring-blue-500 outline-none transition cursor-pointer"
              >
                <option value="newest">Najnowsze</option>
                <option value="price-asc">Cena: od najniższej</option>
                <option value="price-desc">Cena: od najwyższej</option>
                <option value="name">Nazwa (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-slate-800 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold mb-4">😢 Brak produktów</p>
              <p className="text-gray-500">Spróbuj zmienić kryteria wyszukiwania</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Znaleziono <span className="font-bold">{filteredProducts.length}</span> produktów
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>📦</span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                      <div className="flex-1"></div>

                      <div className="mt-4 space-y-3">
                        <div className="text-2xl font-black text-blue-600">
                          {product.price.toFixed(2)} zł
                        </div>

                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all active:scale-95"
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Nie znalazłeś szukanego produktu?</h2>
          <p className="text-blue-100 mb-6">Skontaktuj się z nami - pomożemy Ci znaleźć idealne rozwiązanie!</p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            📧 Napisz do nas
          </Link>
        </div>
      </section>
    </div>
  );
}
