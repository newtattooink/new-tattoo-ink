import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Opcional: defina categorias válidas para pré-renderizar
  return [
    { categoria: "leao" },
    { categoria: "rosa-caveira" },
    { categoria: "oldschool" },
    // adicione outras categorias aqui
  ];
}

export default async function CategoriaPage({ params }) {
  const { categoria } = params;

  // Caminho absoluto da pasta das imagens da categoria
  const pastaImagens = path.join(process.cwd(), "public", "tattoos", categoria);

  // Verifica se a pasta existe
  if (!fs.existsSync(pastaImagens)) {
    return notFound();
  }

  // Lista todos os arquivos da pasta (filtra só imagens jpg, png, webp)
  const arquivos = fs
    .readdirSync(pastaImagens)
    .filter((arquivo) => /\.(jpe?g|png|webp)$/i.test(arquivo));

  if (arquivos.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl">Nenhuma imagem encontrada para a categoria {categoria}</h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 capitalize">
        {categoria.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {arquivos.map((arquivo, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-800 hover:scale-105 transition shadow-lg"
          >
            <Image
              src={`/tattoos/${categoria}/${arquivo}`}
              alt={`${categoria} tatuagem ${i + 1}`}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
              priority={i < 3} // prioridade para as primeiras 3 imagens carregarem rápido
            />
          </div>
        ))}
      </div>
    </main>
  );
}
