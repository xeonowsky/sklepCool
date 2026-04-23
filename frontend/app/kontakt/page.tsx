'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Symulacja wysyłania maila (w przyszłości można dodać backend)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Wiadomość:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Błąd wysyłania:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">📧 Skontaktuj się z nami</h1>
          <p className="text-lg text-blue-100">Jesteśmy tutaj, aby Ci pomóc</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* CONTACT INFO */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-blue-50 dark:bg-slate-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-black mb-6">Dane kontaktowe</h3>

              <div className="space-y-6">
                {/* PHONE */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">📞 Telefon</p>
                  <a href="tel:+48123456789" className="text-lg font-bold text-blue-600 hover:underline">
                    +48 123 456 789
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pn-Pt: 9:00-17:00</p>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">✉️ Email</p>
                  <a href="mailto:support@sklepcool.pl" className="text-lg font-bold text-blue-600 hover:underline">
                    support@sklepcool.pl
                  </a>
                </div>

                {/* ADDRESS */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">📍 Adres</p>
                  <p className="text-sm">
                    SklepCool sp. z o.o.<br />
                    Ul. Handlowa 123<br />
                    00-001 Warszawa, Polska
                  </p>
                </div>

                {/* SOCIAL */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Social Media</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white text-xl transition">
                      f
                    </a>
                    <a href="#" className="w-12 h-12 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center text-white text-xl transition">
                      𝕏
                    </a>
                    <a href="#" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center text-white text-xl transition">
                      📷
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Wyślij nam wiadomość</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Imię i nazwisko *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jan Kowalski"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 ring-blue-500 outline-none transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Adres email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jan@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 ring-blue-500 outline-none transition"
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Temat *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 ring-blue-500 outline-none transition cursor-pointer"
                  >
                    <option value="">Wybierz temat...</option>
                    <option value="order">Pytanie o zamówienie</option>
                    <option value="product">Pytanie o produkt</option>
                    <option value="shipping">Dostawa i zwroty</option>
                    <option value="complaint">Reklamacja</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Wiadomość *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Twoja wiadomość..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 ring-blue-500 outline-none transition resize-none"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {isSubmitting ? '⏳ Wysyłanie...' : '✉️ Wyślij wiadomość'}
                </button>

                {/* STATUS MESSAGES */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 font-semibold">
                      ✅ Wiadomość wysłana pomyślnie! Odezwiemy się wkrótce.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 font-semibold">
                      ❌ Błąd wysyłania. Spróbuj ponownie.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray-50 dark:bg-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center">❓ Często zadawane pytania</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Jaki jest czas dostawy?',
                a: 'Standardowa dostawa trwa 2-3 dni robocze. Dostawa ekspresowa dostępna w wybranych miastach.',
              },
              {
                q: 'Jaka jest polityka zwrotów?',
                a: 'Możesz zwrócić produkt w ciągu 14 dni od otrzymania. Towary muszą być w oryginalnym opakowaniu.',
              },
              {
                q: 'Czy moga płacić ratami?',
                a: 'Tak! Oferujemy płatności ratalne za pośrednictwem Klarna i PayPo.',
              },
              {
                q: 'Czy odbieramy zamówienia z zagranicy?',
                a: 'Obecnie wysyłamy wyłącznie do Polski. Plany na rozszerzenie dostaw już wkrótce!',
              },
            ].map((faq, index) => (
              <details key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg cursor-pointer hover:shadow-lg transition">
                <summary className="font-bold text-lg flex justify-between items-center">
                  {faq.q}
                  <span>▼</span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Powrót do sklepu</h2>
          <Link
            href="/sklep"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            🛍️ Przejdź do katalogu
          </Link>
        </div>
      </section>
    </div>
  );
}
