'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from './lib/product';
import { addToCartWithFeedback } from './lib/guestCart';
import HeroBanner from './_components/HeroBanner';



export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/products",{
        credentials: "include" ,
        headers: { 'Content-Type': 'application/json'},
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.content);
      }
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    await addToCartWithFeedback({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <HeroBanner />



      {/* PRODUCTS */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-bold">Polecane dla Ciebie</h2>
      <Link href="/sklep" className="text-blue-600 hover:text-blue-700 font-bold text-sm">
        Przejdź do pełnego katalogu →
      </Link>
    </div>
    
    {isLoading ? (
      <div className="flex justify-center py-20 text-blue-600 font-bold">Ładowanie produktów...</div>
    ) : products.length === 0 ? (
      <div className="text-center py-20">Nie znaleziono żadnych produktów w sklepie.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
            <div className="aspect-square bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
              📦
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 h-12 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-black text-slate-900 dark:text-white">{product.price} zł</span>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="bg-slate-900 dark:bg-blue-600 text-white p-3 rounded-xl hover:scale-110 active:scale-95 transition-all"
                >
                  Dodaj +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
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
              className=" bg-white flex-1 px-6 py-4 rounded-2xl text-slate-900 focus:ring-4 ring-blue-300 outline-none"
            />
            <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition">
              Zapisz się
            </button>
          </div>
        </div>
      </section>

  
    </div>
  );
}