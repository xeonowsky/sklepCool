'use client';

import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-10 text-center">
        <div className="text-5xl mb-4">🚫</div>
        <h1 className="text-2xl font-black mb-2 text-red-600">Płatność anulowana</h1>
        <p className="text-gray-500 mb-6">
          Płatność została przerwana. Twoje zamówienie nie zostało opłacone. Możesz spróbować ponownie z koszyka.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/cart"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all hover:shadow-lg"
          >
            Wróć do koszyka
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 font-bold rounded-xl transition-all"
          >
            Powrót do sklepu
          </Link>
        </div>
      </div>
    </div>
  );
}
