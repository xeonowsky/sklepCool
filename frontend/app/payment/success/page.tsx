'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Status = 'loading' | 'paid' | 'pending' | 'error';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    const confirm = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/payment/confirm/${orderId}`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!res.ok) {
          setStatus('error');
          return;
        }

        const data = await res.json();
        setStatus(data.paid ? 'paid' : 'pending');
      } catch {
        setStatus('error');
      }
    };

    confirm();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-10 text-center">
        {status === 'loading' && (
          <>
            <div className="text-5xl mb-4">⏳</div>
            <h1 className="text-2xl font-black mb-2">Sprawdzanie płatności...</h1>
            <p className="text-gray-500">Potwierdzamy status Twojej płatności w Stripe.</p>
          </>
        )}

        {status === 'paid' && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-black mb-2 text-green-600">Płatność zakończona</h1>
            <p className="text-gray-500 mb-6">
              Dziękujemy! Twoje zamówienie zostało opłacone.
            </p>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="text-5xl mb-4">🕒</div>
            <h1 className="text-2xl font-black mb-2 text-yellow-600">Płatność w toku</h1>
            <p className="text-gray-500 mb-6">
              Płatność nie została jeszcze potwierdzona. Jeśli ją ukończyłeś, odśwież stronę za chwilę.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-black mb-2 text-red-600">Nie udało się potwierdzić</h1>
            <p className="text-gray-500 mb-6">
              Wystąpił problem przy potwierdzaniu płatności. Sprawdź historię zamówień lub spróbuj ponownie.
            </p>
          </>
        )}

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-lg"
        >
          Powrót do sklepu
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
