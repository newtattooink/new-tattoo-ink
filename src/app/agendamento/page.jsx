"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Agendamento() {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.replace("/login?error=login_required");
      }
      setLoading(false); // só termina quando já detectou
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Verificando login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Agendar Horário</h1>
        <p>Bem-vindo, {user?.displayName?.split(" ")[0] || "usuário"}!</p>
        {/* Formulário de agendamento aqui */}
      </div>
    </div>
  );
}
