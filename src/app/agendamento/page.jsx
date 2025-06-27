"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // <- CORRETO no App Router
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Agendamento() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login?error=login_required");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Agendar Horário</h1>
        {/* Adicione seu formulário aqui */}
      </div>
    </div>
  );
}
