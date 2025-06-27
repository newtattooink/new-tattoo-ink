"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "login_required") {
      setLoginError("Você precisa estar logado para agendar horário.");
      setIsLogin(true);
      setShowModal(true);
    }
  }, [searchParams]);

  function closeModal() {
    setShowModal(false);
    setLoginError("");
  }

  // Função para tratar o submit do login
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError(""); // limpa erros antigos

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      if (!email || !password) {
        throw new Error("Preencha todos os campos.");
      }

      // Aqui você deve colocar a lógica real de login, por exemplo Firebase Auth
      // Simulação de erro:
      if (email !== "usuario@exemplo.com" || password !== "123456") {
        throw new Error("E-mail ou senha inválidos.");
      }

      alert("Login realizado com sucesso!");
      // Redirecionar ou atualizar a UI aqui

    } catch (err) {
      setLoginError(err.message);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 flex items-center justify-center px-4">
        <div className="w-full max-w-md overflow-hidden border border-gray-800 rounded-2xl bg-black/60 backdrop-blur-md shadow-2xl">
          <div className="relative w-full h-full">
            {/* Slide container */}
            <div
              className={`flex transition-transform duration-500 ease-in-out w-[200%] ${
                isLogin ? "translate-x-0" : "-translate-x-1/2"
              }`}
            >
              {/* LOGIN */}
              <div className="w-full p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-widest">
                  Login
                </h1>
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
                    <input
                      name="email"
                      type="email"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Senha</label>
                    <input
                      name="password"
                      type="password"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Mostrar erro se houver */}
                  {loginError && !showModal && (
                    <p className="text-red-500 text-sm mt-2">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
                  >
                    Entrar
                  </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                  Ainda não tem conta?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setLoginError(""); // limpa erro ao trocar para cadastro
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>

              {/* CADASTRO */}
              <div className="w-full p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-widest">
                  Cadastro
                </h1>
                <form className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Nome completo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Senha</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Crie uma senha"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
                  >
                    Cadastrar
                  </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                  Já tem conta?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setLoginError("");
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    Fazer login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 text-white rounded-lg p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro do modal
          >
            <h2 className="text-xl font-semibold mb-4">Atenção</h2>
            <p className="mb-6">{loginError}</p>
            <button
              onClick={closeModal}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}
