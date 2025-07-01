"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import BotaoVoltar from "@/components/BotaoVoltar";

export default function CatalogoClient({ categorias }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white font-sans px-4 py-10 relative">
      <BotaoVoltar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide">
          Catálogo de Tatuagens
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categorias.map((cat, i) => (
            <div
              key={i}
              onClick={() => router.push(`/catalogo/${cat.slug}`)}
              className="relative group rounded-2xl overflow-hidden bg-zinc-900 border border-purple-700 shadow-xl hover:shadow-purple-500/30 transition cursor-pointer"
            >
              <Image
                src={cat.src}
                alt={cat.nome}
                width={500}
                height={500}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white font-bold text-lg text-center px-4">
                  {cat.nome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
