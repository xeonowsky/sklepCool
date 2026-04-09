'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stan formularza
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    imageUrl: ''
  });

  const API_URL = "http://localhost:8080/api/v1/products";

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.content);
      }
    } catch (err) {
      console.error("Błąd pobierania:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),

      });

      if (res.ok) {
        setFormData({ name: '', price: 0, quantity: 0, imageUrl: '' });
        fetchProducts(); // Odśwież listę
        alert("Produkt został dodany!");
      }
    } catch (err) {
      alert("Błąd podczas dodawania produktu");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten produkt?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        // credentials: "include" 
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error("Błąd usuwania:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black mb-10 text-slate-800">Panel Administratora</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* FORMULARZ DODAWANIA */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Dodaj nowy produkt</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nazwa produktu</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-blue-500"
                  placeholder="np. Klawiatura Mechaniczna"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cena (zł)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ilość</label>
                  <input
                    required
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL Zdjęcia</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 ring-blue-500"
                  placeholder="https://link-do-zdjecia.pl"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Zapisz produkt
              </button>
            </div>
          </form>
        </div>

        {/* LISTA PRODUKTÓW */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-sm text-slate-600">Produkt</th>
                  <th className="p-4 font-bold text-sm text-slate-600">Cena</th>
                  <th className="p-4 font-bold text-sm text-slate-600">Stan</th>
                  <th className="p-4 font-bold text-sm text-slate-600 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-10 text-center">Ładowanie...</td></tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-lg">
                          {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover rounded" /> : '📦'}
                        </div>
                        <span className="font-medium text-slate-700">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-blue-600">{product.price.toFixed(2)} zł</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.quantity} szt.
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        Usuń 🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}