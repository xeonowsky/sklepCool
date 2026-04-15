'use client';

import { useEffect, useState } from 'react';
import { Product } from '../lib/product';

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 FETCH KOSZYKA
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/cart", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        setProducts([]);
        return;
      }

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Błąd koszyka:", err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 USUWANIE PRODUKTU
  const removeFromCart = async (productId: string) => {
    try {
      await fetch(`http://localhost:8080/api/v1/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart(); // refresh
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-black mb-10">🛒 Twój koszyk</h1>

        {/* LOADING */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Koszyk jest pusty 😢
          </div>
        ) : (
          <>
            {/* LISTA */}
            <div className="space-y-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-3xl rounded-xl">
                      {p.image || '📦'}
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">{p.name}</h2>
                      <p className="text-gray-500 text-sm">{p.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black">{p.price} zł</p>

                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PODSUMOWANIE */}
            <div className="mt-10 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <span className="text-xl font-bold">
                Razem:
              </span>

              <span className="text-2xl font-black text-blue-600">
                {total} zł
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}