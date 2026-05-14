'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { GUEST_CART_CHANGED_EVENT, guestCartItemCount } from '../lib/guestCart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/cart", {
        method: "GET",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const items = data.items ?? [];
        const count = items.reduce(
          (sum: number, item: { quantity?: number }) => sum + (item.quantity ?? 0),
          0
        );
        setCartCount(count);
        return;
      }
    } catch {
      // sieć / serwer — spróbuj koszyk gościa
    }
    setCartCount(guestCartItemCount());
  }, []);

  useEffect(() => {
    void refreshCartCount();
    if (typeof window === 'undefined') return;
    const onGuest = () => void refreshCartCount();
    window.addEventListener(GUEST_CART_CHANGED_EVENT, onGuest);
    return () => window.removeEventListener(GUEST_CART_CHANGED_EVENT, onGuest);
  }, [refreshCartCount]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SklepCool
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/sklep" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
              Sklep
            </Link>
            <Link href="/kontakt" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
              Kontakt
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
              Zaloguj się
            </Link>
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
            <Link href="/sklep" className="block px-4 py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md">
              Sklep
            </Link>
            <Link href="/kontakt" className="block px-4 py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md">
              Kontakt
            </Link>
            <Link href="/login" className="block px-4 py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md">
              Zaloguj się
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
