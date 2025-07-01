import fs from "fs";
import path from "path";
import CatalogoClient from "./CatalogoClient";

export default function CatalogoPage() {
  const tattoosDir = path.join(process.cwd(), "public", "tattoos");

  const categorias = fs
    .readdirSync(tattoosDir)
    .filter((nome) => {
      const pasta = path.join(tattoosDir, nome);
      return fs.statSync(pasta).isDirectory();
    });

  const dadosCategorias = categorias.map((categoria) => {
    const pasta = path.join(tattoosDir, categoria);
    const arquivos = fs
      .readdirSync(pasta)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    const imagem = arquivos.find((arq) => arq.includes("cover")) || arquivos[0];

    return {
      nome: categoria.replace(/-/g, " "),
      slug: categoria,
      src: `/tattoos/${categoria}/${imagem}`,
    };
  });

  return <CatalogoClient categorias={dadosCategorias} />;
}
