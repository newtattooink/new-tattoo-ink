"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AuthPageContent() {
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

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      if (!email || !password) {
        throw new Error("Preencha todos os campos.");
      }

      if (email !== "usuario@exemplo.com" || password !== "123456") {
        throw new Error("E-mail ou senha inválidos.");
      }

      alert("Login realizado com sucesso!");
      // Redirecionar para dashboard ou home, por exemplo
    } catch (err) {
      setLoginError(err.message);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 flex items-center justify-center px-4">
        <div className="w-full max-w-md overflow-hidden border border-gray-800 rounded-2xl bg-black/60 backdrop-blur-md shadow-2xl">
          <div className="relative w-full h-full">
            <div
              className={`flex transition-transform duration-500 ease-in-out w-[200%] ${
                isLogin ? "translate-x-0" : "-translate-x-1/2"
              }`}
            >
              {/* Login */}
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
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Senha</label>
                    <input
                      name="password"
                      type="password"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white"
                      placeholder="••••••••"
                    />
                  </div>

                  {loginError && !showModal && (
                    <p className="text-red-500 text-sm mt-2">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg"
                  >
                    Entrar
                  </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                  Ainda não tem conta?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setLoginError("");
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>

              {/* Cadastro */}
              <div className="w-full p-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-widest">
                  Cadastro
                </h1>
                <form className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Nome completo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Senha</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-zinc-900 border border-gray-700 rounded-md text-white"
                      placeholder="Crie uma senha"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="bg-gray-900 text-white rounded-lg p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
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

// Wrapping com Suspense para compatibilidade com useSearchParams
export default function AuthPageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Carregando...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
