'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '../lib/product';
import {
  clearGuestCart,
  guestLinesToProducts,
  removeProductFromGuestCart,
  updateGuestCartQuantity,
} from '../lib/guestCart';

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isGuestCart, setIsGuestCart] = useState(false);

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

        if (Array.isArray(data.notEnoughProducts) && data.notEnoughProducts.length > 0) {
          alert("❌ Niektóre produkty nie mają wystarczającej ilości na stanie. Zaktualizuj koszyk.");
          await fetchCart();
          return;
        }

        if (!data.orderId) {
          alert("❌ Nie udało się utworzyć zamówienia. Spróbuj ponownie.");
          return;
        }

        if (isGuestCart) clearGuestCart();

        const checkoutRes = await fetch(
          `http://localhost:8080/api/v1/payment/checkout/${data.orderId}`,
          {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (checkoutRes.ok) {
          const checkout = await checkoutRes.json();
          if (checkout.url) {
            window.location.href = checkout.url;
            return;
          }
          alert("❌ Brak adresu płatności Stripe.");
        } else {
          console.error(`Błąd płatności ${checkoutRes.status}`);
          alert(`❌ Nie udało się rozpocząć płatności (${checkoutRes.status}). Sprawdź konfigurację Stripe.`);
        }
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
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/cart", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setIsGuestCart(false);
        setProducts(
          (data.items ?? []).map((item: { product: Product; quantity?: number }) => ({
            ...item.product,
            quantity: item.quantity ?? 1,
          }))
        );
        return;
      }

      setIsGuestCart(true);
      setProducts(guestLinesToProducts());
    } catch (err) {
      console.error("Błąd koszyka:", err);
      setIsGuestCart(true);
      setProducts(guestLinesToProducts());
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (isGuestCart) {
      removeProductFromGuestCart(productId);
      setProducts(guestLinesToProducts());
      return;
    }
    try {
      await fetch(`http://localhost:8080/api/v1/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchCart();
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }

    if (isGuestCart) {
      updateGuestCartQuantity(productId, newQuantity);
      setProducts(guestLinesToProducts());
      return;
    }

    const current = products.find((p) => p.id === productId)?.quantity ?? 0;
    const diff = newQuantity - current;
    if (diff === 0) return;

    const base = "http://localhost:8080/api/v1/cart";
    try {
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          const res = await fetch(`${base}/${productId}`, {
            method: "POST",
            credentials: "include",
          });
          if (!res.ok) break;
        }
      } else {
        for (let i = 0; i < -diff; i++) {
          const res = await fetch(`${base}/decrease/${productId}`, {
            method: "PUT",
            credentials: "include",
          });
          if (!res.ok) break;
        }
      }
      await fetchCart();
    } catch (err) {
      console.error("Błąd aktualizacji ilości:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black">🛒 Twój koszyk</h1>
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-lg"
          >
             Powrót do sklepu
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
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-2xl rounded-xl overflow-hidden flex-shrink-0">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>📦</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="font-bold text-lg">{p.name}</h2>
                      <p className="text-gray-500 text-sm">Cena za szt: {p.price.toFixed(2)} zł</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* ZMIANA ILOŚCI */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(p.id, p.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded font-bold text-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{p.quantity}</span>
                      <button
                        onClick={() => updateQuantity(p.id, p.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded font-bold text-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* CENA */}
                    <div className="text-right">
                      <p className="text-xl font-black text-green-600">{(p.price * p.quantity).toFixed(2)} zł</p>
                      <button
                        onClick={() => removeFromCart(p.id)}
                        className="text-red-500 text-xs mt-1 hover:text-red-700 font-semibold transition"
                      >
                        Usuń z koszyka
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PODSUMOWANIE */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-900">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Liczba artykułów:
                  </span>
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {products.reduce((sum, p) => sum + p.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300 dark:border-slate-700">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Łącznie:
                  </span>
                  <span className="text-4xl font-black text-green-600 dark:text-green-400">
                    {total.toFixed(2)} zł
                  </span>
                </div>
              </div>

              <button
                onClick={makeOrder}
                disabled={isCreatingOrder}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  isCreatingOrder
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg active:scale-95'
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