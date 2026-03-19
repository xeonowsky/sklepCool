'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'react-feather';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Proszę wypełnić wszystkie pola');
      return;
    }

    if (!email.includes('@')) {
      setError('Proszę wpisać prawidłowy adres email');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Logowanie pomyślne! Przekierowywanie...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            SklepCool
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Zaloguj się
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Witaj ponownie! Zaloguj się na swoje konto
          </p>
        </div>


        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Adres Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Hasło
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wpisz swoje hasło"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Zapamiętaj mnie</span>
            </label>
            <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
              Zapomniałeś hasło?
            </Link>
          </div>


          {error && (
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logowanie...
              </>
            ) : (
              'Zaloguj się'
            )}
          </button>


          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Nie masz konta?{' '}
            <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Zarejestruj się
            </Link>
          </div>
        </form>


        <div className="mt-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 text-gray-600 dark:text-gray-400">
                Lub zaloguj się poprzez
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
              <span className="text-2xl">👤</span>
              Facebook
            </button>
            <button className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
              <span className="text-2xl">🔍</span>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
