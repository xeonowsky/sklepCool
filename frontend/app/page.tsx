'use client';

import Link from 'next/link';

import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">

              </button>
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">

              </button>
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 relative">
                
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >

              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                Katalog
              </Link>
              <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                Promocje
              </Link>
              <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                O nas
              </Link>
              <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                Kontakt
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Odkryj Nową Kolekcję
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Najnowsze trendy mody i elektroniki w jednym miejscu. Szybka dostawa i gwarancja satysfakcji.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Kupuj Teraz
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Dowiedz się więcej
                </button>
              </div>
            </div>
            <div className="flex justify-center text-8xl">
              🛍️
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Kategorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="#"
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-8 rounded-lg text-center hover:shadow-lg transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {category.icon}
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Polecane Produkty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow hover:shadow-xl transition group"
              >
                <div className="aspect-square bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-6xl group-hover:scale-110 transition">
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price}
                    </span>
                    <span className="text-sm text-yellow-500">★ {product.rating}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Do koszyka
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 dark:bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bądź na bieżąco z naszymi promocjami</h2>
          <p className="text-blue-100 mb-8">Zapisz się do naszego newslettera i otrzymaj 10% rabatu na pierwszą zamówienie</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Twój email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 dark:text-white dark:bg-blue-800 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Zapisz
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">SklepCool</h3>
              <p className="text-sm">Najlepsza oferta mody i elektroniki w Polsce.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Zakupy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Katalog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Promocje</Link></li>
                <li><Link href="#" className="hover:text-white transition">Nowości</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Obsługa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Kontakt</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition">Zwroty</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Informacje</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">O nas</Link></li>
                <li><Link href="#" className="hover:text-white transition">Polityka prywatności</Link></li>
                <li><Link href="#" className="hover:text-white transition">Warunki użytkownika</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 SklepCool. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
