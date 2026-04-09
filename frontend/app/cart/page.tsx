
'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: string;
};

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCart = async () => {
    const res = await fetch("http://localhost:8080/api/v1/cart", {
      credentials: "include",
    });

    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Twój koszyk 🛒</h1>

      {products.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg">
              <h2 className="font-semibold">{p.name}</h2>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

