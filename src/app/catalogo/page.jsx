"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const tatuagens = [
  {
    id: 1,
    nome: "Leão Realista",
    slug: "leao",
    src: "/tattoos/leao.jpg",
  },
  {
    id: 2,
    nome: "Rosa com Caveira",
    slug: "rosa-caveira",
    src: "/tattoos/rosa-caveira.jpg",
  },
  {
    id: 3,
    nome: "Relógio e Tempo",
    slug: "relogio",
    src: "/tattoos/relogio.jpg",
  },
  {
    id: 4,
    nome: "Old School Naval",
    slug: "oldschool",
    src: "/tattoos/oldschool.jpg",
  },
  {
    id: 5,
    nome: "Tigre Tribal",
    slug: "tigre",
    src: "/tattoos/tigre.jpg",
  },
  {
    id: 6,
    nome: "Borboleta Geométrica",
    slug: "borboleta",
    src: "/tattoos/borboleta.jpg",
  },
];

export default function CatalogoPage() {
  const router = useRouter();

  const handleCategoriaClick = (slug) => {
    router.push(`/catalogo/${slug}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white font-sans px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide">
          Catálogo de Tatuagens
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tatuagens.map((tattoo) => (
            <div
              key={tattoo.id}
              onClick={() => handleCategoriaClick(tattoo.slug)}
              className="relative group rounded-2xl overflow-hidden bg-zinc-900 border border-purple-700 shadow-xl hover:shadow-purple-500/30 transition cursor-pointer"
            >
              <Image
                src={tattoo.src}
                alt={tattoo.nome}
                width={500}
                height={500}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white font-bold text-lg text-center px-4">{tattoo.nome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
