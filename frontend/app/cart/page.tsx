'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '../lib/product';

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const makeOrder = async () => {
    setIsCreatingOrder(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/order", {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ Zamówienie utworzone pomyślnie!");
        setProducts([]);
        router.push('/');
      } else {
        const errorData = await res.text();
        console.error(`Błąd ${res.status}:`, errorData);
        
        if (res.status === 403) {
          alert("❌ Błąd 403: Brak uprawnień. Sprawdź czy jesteś zalogowany i czy Twoje konto ma uprawnienia.");
        } else if (res.status === 401) {
          alert("❌ Błąd 401: Niezalogowany. Zaloguj się ponownie.");
        } else {
          alert(`❌ Błąd serwera ${res.status}. Sprawdź konsolę (F12).`);
        }
      }
    } catch (error) {
      console.error("Błąd zamówienia:", error);
      alert("❌ Błąd połączenia z serwerem");
    } finally {
      setIsCreatingOrder(false);
    }
  };
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
      setProducts(data.items?.map((item: any) => item.product) || []);
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
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black">🛒 Twój koszyk</h1>
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-lg"
          >
            ← Powrót do sklepu
          </Link>
        </div>

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
                      {p.name || '📦'}
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">{p.name}</h2>
                      <p className="text-gray-500 text-sm">{p.price}</p>
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
            <div className="mt-10 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">
                  Razem:
                </span>

                <span className="text-2xl font-black text-blue-600">
                  {total} zł
                </span>
              </div>

              <button
                onClick={makeOrder}
                disabled={isCreatingOrder}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all ${
                  isCreatingOrder
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {isCreatingOrder ? '⏳ Tworzenie zamówienia...' : ' Złóż zamówienie'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}