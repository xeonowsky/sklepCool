'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'Elegancka Koszulka', price: '49.99 zł', category: 'Odzież', image: '🎽', rating: 4.8 },
    { id: 2, name: 'Spodnie Denimu', price: '129.99 zł', category: 'Odzież', image: '👖', rating: 4.7 },
    { id: 3, name: 'Stylowe Buty', price: '189.99 zł', category: 'Obuwie', image: '👟', rating: 4.9 },
    { id: 4, name: 'Klasyczny Kapelusz', price: '59.99 zł', category: 'Akcesoria', image: '🧢', rating: 4.6 },
  ];

  const categories = [
    { name: 'Odzież', icon: '👕' },
    { name: 'Obuwie', icon: '👟' },
    { name: 'Akcesoria', icon: '👜' },
    { name: 'Elektronika', icon: '💻' },
  ];

  // --- LOGIKA API ---
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/cart", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCartCount(data.products.length);
      }
    } catch (error) {
      console.error("Błąd pobierania koszyka:", error);
    }
  };

  const addToCart = async (product: any) => {
    try {
      await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      });
      fetchCart(); 
    } catch (error) {
      console.error("Błąd dodawania do koszyka:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SklepCool
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['Katalog', 'Promocje', 'O nas', 'Kontakt'].map((item) => (
                <Link key={item} href="#" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="p-2 relative hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition">
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>


          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-1 animate-in slide-in-from-top duration-300">
              {['Katalog', 'Promocje', 'O nas', 'Kontakt'].map((item) => (
                <Link key={item} href="#" className="block px-4 py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md">
                  {item}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-24">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Nowy wymiar <br/><span className="text-blue-300">stylu i technologii</span>
              </h1>
              <p className="text-lg mb-10 text-blue-100 max-w-lg">
                Najnowsze trendy zebrane w jednym miejscu. Dołącz do tysięcy zadowolonych klientów SklepCool.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
                  Sprawdź ofertę
                </button>
                <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                  Odbierz rabat
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center text-[10rem] drop-shadow-2xl animate-bounce-slow">
              🛍️
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Kategorie</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href="#" className="group bg-gray-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 p-8 rounded-2xl text-center hover:border-blue-500 hover:shadow-2xl transition-all">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
              <p className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Polecane dla Ciebie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-square bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">{product.category}</span>
                    <span className="text-sm font-medium text-yellow-500 flex items-center">★ {product.rating}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-4 h-12 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-slate-900 dark:text-white">{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-slate-900 dark:bg-blue-600 text-white p-3 rounded-xl hover:scale-110 active:scale-95 transition-all"
                    >
                      Dodaj +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-4xl font-bold mb-4 relative z-10">Zapisz się po zniżkę -15%</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto relative z-10">Bądź pierwszy. Otrzymuj powiadomienia o nowych dropach i limitowanych kolekcjach.</p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 relative z-10">
            <input
              type="email"
              placeholder="Twój adres e-mail"
              className="flex-1 px-6 py-4 rounded-2xl text-slate-900 focus:ring-4 ring-blue-300 outline-none"
            />
            <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition">
              Zapisz się
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SklepCool</h3>
            <p className="text-slate-500 dark:text-slate-400">Najlepsza jakość i styl, na który zasługujesz. Twój codzienny wybór od 2026 roku.</p>
          </div>
          {['Zakupy', 'Obsługa', 'Informacje'].map((title) => (
            <div key={title}>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">{title}</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                <li><Link href="#" className="hover:text-blue-600 transition">Link przykładowy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition">Regulaminy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition">Polityka prywatności</Link></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-50 dark:border-slate-900 text-center text-slate-400 text-xs">
          &copy; 2026 SklepCool. Kod połączony i zoptymalizowany.
        </div>
      </footer>
    </div>
  );
}