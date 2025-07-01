"use client";

import { useState } from "react";
import Image from "next/image";

export default function CategoriaClient({ categoria, arquivos }) {
  const [imagemAberta, setImagemAberta] = useState(null);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 capitalize">
        {categoria.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {arquivos.map((arquivo, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-800 hover:scale-105 transition cursor-pointer shadow-lg"
            onClick={() => setImagemAberta(`/tattoos/${categoria}/${arquivo}`)}
          >
            <Image
              src={`/tattoos/${categoria}/${arquivo}`}
              alt={`${categoria} tatuagem ${i + 1}`}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
              priority={i < 3}
            />
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {imagemAberta && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setImagemAberta(null)}
        >
          <img
            src={imagemAberta}
            alt="Imagem ampliada"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
