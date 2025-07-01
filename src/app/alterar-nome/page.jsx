"use client";

import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// Componente BotaoVoltar
function BotaoVoltar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="absolute top-4 right-4 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition z-[100]"
      style={{ position: "absolute", top: 16, right: 16, zIndex: 100 }}
    >
      Voltar
    </button>
  );
}

export default function AlterarNomePage() {
  const auth = getAuth();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [novoNome, setNovoNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingUser(false);
      if (usr && usr.displayName) {
        setNovoNome(usr.displayName);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loadingUser) {
    return (
      <div style={{ padding: 20 }}>
        <p>Carregando dados do usuário...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <p>Você precisa estar logado para alterar seu nome.</p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      await updateProfile(user, { displayName: novoNome });
      setMensagem("Nome alterado com sucesso!");
      // router.refresh();
    } catch (error) {
      setMensagem("Erro ao alterar nome: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <BotaoVoltar />

      <h1
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: "#2563EB",
          textShadow: "2px 2px 6px rgba(37, 99, 235, 0.7)",
          marginBottom: 24,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          userSelect: "none",
        }}
      >
        Alterar Nome
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <label
          htmlFor="nome"
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1e40af",
            marginBottom: 8,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textShadow: "1px 1px 3px rgba(30, 64, 175, 0.6)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            userSelect: "none",
          }}
        >
          Novo nome:
        </label>

        <input
          type="text"
          id="nome"
          name="nome"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          required
          disabled={loading}
          minLength={3}
          placeholder="Digite seu novo nome"
          style={{
            padding: "12px 16px",
            fontSize: 18,
            fontWeight: "600",
            borderRadius: 10,
            border: "2px solid #2563EB",
            background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
            color: "#1e40af",
            boxShadow: "0 0 8px rgba(37, 99, 235, 0.5)",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 12px 3px #2563EB";
            e.target.style.borderColor = "#1e40af";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "0 0 8px rgba(37, 99, 235, 0.5)";
            e.target.style.borderColor = "#2563EB";
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 12,
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1e40af";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#2563EB";
          }}
        >
          {loading ? "Alterando..." : "Alterar Nome"}
        </button>
      </form>

      {mensagem && (
        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            color: mensagem.includes("sucesso") ? "green" : "red",
            fontWeight: "600",
          }}
        >
          {mensagem}
        </p>
      )}
    </main>
  );
}
