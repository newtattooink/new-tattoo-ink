"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [auth]); // Adiciona dependência ao useEffect para segurança

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/"); // Redireciona após logout
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="w-full bg-black text-white px-4 py-3 flex justify-between items-center border-b border-gray-800">
      <h1 className="text-xl font-bold">New Tattoo Ink</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
         Olá, {(user.displayName?.split(" ")[0]) || user.email || "Usuário"}!
        </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => router.push("/login")}
            className="hover:underline"
          >
            Entrar
          </button>
          <button
            onClick={() => router.push("/login")}
            className="hover:underline"
          >
            Cadastrar
          </button>
        </div>
      )}
    </header>
  );
}
