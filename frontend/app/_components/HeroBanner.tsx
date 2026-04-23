'use client';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-24">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Nowy wymiar <br/><span className="text-blue-300">stylu i technologii</span>
            </h1>
            <p className="text-lg mb-10 text-blue-100 max-w-lg">
              Najnowsze trendy zebrane w jednym miejscu. Dołącz do tysięcy zadowolonych klientów SklepCool.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
                Sprawdź ofertę
              </button>
              <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                Odbierz rabat
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center text-[10rem] drop-shadow-2xl animate-bounce-slow"></div>
        </div>
      </div>
    </section>
  );
}
