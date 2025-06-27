"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedNavigation = (path) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push("/login?error=login_required");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold tracking-wide text-white">New Tattoo Ink</h1>

          {/* Botão de menu para mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/catalogo" className="hover:text-gray-300">Catálogo</Link>
            <button onClick={() => handleProtectedNavigation("/agendamento")} className="hover:text-gray-300">
              Agendamento
            </button>
            <button onClick={() => handleProtectedNavigation("/parceria")} className="hover:text-gray-300">
              Parcerias
            </button>
            <a
              href="/login"
              className="flex items-center gap-2 text-white hover:text-gray-300 border border-gray-700 px-3 py-1.5 rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.001 10.001 0 0112 2a10.001 10.001 0 016.879 15.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Login
            </a>
          </nav>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden bg-black px-4 pb-3 space-y-2">
            <Link href="/catalogo" className="block py-2" onClick={() => setMenuOpen(false)}>Catálogo</Link>
            <button onClick={() => { handleProtectedNavigation("/agendamento"); setMenuOpen(false); }} className="block py-2">
              Agendamento
            </button>
            <button onClick={() => { handleProtectedNavigation("/parceria"); setMenuOpen(false); }} className="block py-2">
              Parcerias
            </button>
            <a href="/login" className="block py-2 border-t border-gray-800 pt-2" onClick={() => setMenuOpen(false)}>
              Login
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-4 pt-24">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Sua Pele, Nossa Arte</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">
          Transformando ideias em tatuagens únicas. Agende seu horário ou explore nosso catálogo exclusivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/catalogo")}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Ver Catálogo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} New Tattoo Ink. Todos os direitos reservados.
      </footer>
    </main>
  );
}
