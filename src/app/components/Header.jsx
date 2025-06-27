"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold whitespace-nowrap">New Tattoo Ink</h1>

        {/* Botão hambúrguer no mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/catalogo" className="hover:text-gray-300">Catálogo</Link>
          <Link href="/agendamento" className="hover:text-gray-300">Agendamento</Link>
          <Link href="/parcerias" className="hover:text-gray-300">Parcerias</Link>
        </nav>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-black px-4 pb-4">
          <Link href="/catalogo" className="block py-2">Catálogo</Link>
          <Link href="/agendamento" className="block py-2">Agendamento</Link>
          <Link href="/parcerias" className="block py-2">Parcerias</Link>
        </div>
      )}
    </header>
  );
}
