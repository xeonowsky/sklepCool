import Link from "next/link"
export function FooterComponent(){
    return(
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SklepCool</h3>
            <p className="text-slate-500 dark:text-slate-400">Najlepsza jakość i styl, na który zasługujesz. Twój codzienny wybór od 2026 roku.</p>
          </div>
          {['Zakupy', 'Obsługa', 'Informacje'].map((title) => (
            <div key={title}>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-400">{title}</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                <li><Link href="#" className="hover:text-blue-600 transition">Link przykładowy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition">Regulaminy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition">Polityka prywatności</Link></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-50 dark:border-slate-900 text-center text-slate-400 text-xs">
          &copy; 2026 SklepCool. Kod połączony i zoptymalizowany.
        </div>
      </footer>
    )
}