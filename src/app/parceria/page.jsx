"use client";

import { useRouter } from "next/navigation";

export default function ParceriaPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      {/* Botão Voltar */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition z-50"
      >
        Voltar
      </button>

      <img
        src="/manutencao.jpg"
        alt="Página em manutenção"
        className="max-w-full h-auto"
      />
    </div>
  );
}


/*
"use client";

import { useState } from "react";

export default function ParceriaPage() {
  const [formData, setFormData] = useState({
    redeSocial: "",
    seguidores: "",
    codigoParceiro: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { redeSocial, seguidores, codigoParceiro } = formData;

    if (!redeSocial || !seguidores || !codigoParceiro) {
      setSubmitMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (isNaN(Number(seguidores))) {
      setSubmitMessage("Quantidade de seguidores deve ser um número.");
      return;
    }

    // Aqui você pode integrar com backend/Firebase para salvar dados

    setSubmitMessage("Cadastro realizado com sucesso! Obrigado por se tornar parceiro.");
    setFormData({ redeSocial: "", seguidores: "", codigoParceiro: "" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden border border-gray-800 rounded-2xl bg-black/60 backdrop-blur-md shadow-2xl">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
            Parceria Influenciador
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-400 font-medium" htmlFor="redeSocial">
                Nome da Rede Social
              </label>
              <input
                id="redeSocial"
                name="redeSocial"
                type="text"
                placeholder="Instagram, TikTok, YouTube..."
                value={formData.redeSocial}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-zinc-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400 font-medium" htmlFor="seguidores">
                Quantidade de Seguidores
              </label>
              <input
                id="seguidores"
                name="seguidores"
                type="number"
                min="0"
                placeholder="Ex: 5000"
                value={formData.seguidores}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-zinc-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400 font-medium" htmlFor="codigoParceiro">
                Código de Parceiro
              </label>
              <input
                id="codigoParceiro"
                name="codigoParceiro"
                type="text"
                placeholder="Digite seu código"
                value={formData.codigoParceiro}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-zinc-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {submitMessage && (
              <p
                className={\`text-center mt-2 \${
                  submitMessage.includes("sucesso") ? "text-green-400" : "text-red-500"
                }\`}
              >
                {submitMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg shadow-md mt-4"
            >
              Cadastrar Parceiro
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="/login"
              className="text-purple-400 hover:underline font-semibold"
            >
              Voltar para Login
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
*/
