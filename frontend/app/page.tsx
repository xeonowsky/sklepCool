
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Elegancka Koszulka',
      price: '49.99 zł',
      category: 'Odzież',
      image: '🎽',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Spodnie Denimu',
      price: '129.99 zł',
      category: 'Odzież',
      image: '👖',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Stylowe Buty',
      price: '189.99 zł',
      category: 'Obuwie',
      image: '👟',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Klasyczny Kapelusz',
      price: '59.99 zł',
      category: 'Akcesoria',
      image: '🧢',
      rating: 4.6,
    },
  ];

  const categories = [
    { name: 'Odzież', icon: '👕' },
    { name: 'Obuwie', icon: '👟' },
    { name: 'Akcesoria', icon: '👜' },
    { name: 'Elektronika', icon: '💻' },
  ];

  // 🔥 pobranie koszyka
  const fetchCart = async () => {
    const res = await fetch("http://localhost:8080/api/cart", {
      credentials: "include",
    });

    const data = await res.json();
    setCartCount(data.products.length);
  };

  // 🔥 dodanie produktu
  const addToCart = async (product: any) => {
    await fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product),
    });

    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                SklepCool
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Katalog
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Promocje
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                O nas
              </Link>
              <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Kontakt
              </Link>
            </div>

            <div className="flex items-center space-x-4">

              {/* 🛒 koszyk */}
              <Link href="/cart" className="p-2 relative text-gray-700 dark:text-gray-300">
                🛒
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>

              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="#" className="block px-4 py-2">Katalog</Link>
              <Link href="#" className="block px-4 py-2">Promocje</Link>
              <Link href="#" className="block px-4 py-2">O nas</Link>
              <Link href="#" className="block px-4 py-2">Kontakt</Link>
            </div>
          )}
        </nav>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Odkryj Nową Kolekcję</h1>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Polecane Produkty
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow"
              >
                <div className="text-6xl text-center p-6">
                  {product.image}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>

                  <p className="text-blue-600 font-bold">
                    {product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg"
                  >
                    Do koszyka
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

