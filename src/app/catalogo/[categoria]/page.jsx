import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import CategoriaClient from "./CategoriaClient";

// Gera as rotas com base nas pastas encontradas dentro de /public/tattoos
export async function generateStaticParams() {
  const tattoosPath = path.join(process.cwd(), "public", "tattoos");

  const categorias = fs
    .readdirSync(tattoosPath)
    .filter((nome) => {
      const caminho = path.join(tattoosPath, nome);
      return fs.statSync(caminho).isDirectory();
    });

  return categorias.map((categoria) => ({ categoria }));
}

export default async function CategoriaPage({ params }) {
  const { categoria } = params;
  const pasta = path.join(process.cwd(), "public", "tattoos", categoria);

  // Se a pasta não existir, retorna 404
  if (!fs.existsSync(pasta)) return notFound();

  try {
    const arquivos = fs
      .readdirSync(pasta)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort();

    if (arquivos.length === 0) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white pt-[64px]">
          <h2 className="text-3xl">
            Nenhuma imagem encontrada para a categoria {categoria}
          </h2>
        </main>
      );
    }

    return <CategoriaClient categoria={categoria} arquivos={arquivos} />;
  } catch (error) {
    console.error("Erro ao ler imagens:", error);
    return notFound();
  }
}
