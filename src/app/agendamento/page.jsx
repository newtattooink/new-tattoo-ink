import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Agendamento() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Não está logado, redireciona para login
        router.replace("/login?error=login-necessario");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div>
      {/* Conteúdo da página de agendamento */}
      <h1>Agendar Horário</h1>
      {/* resto do formulário */}
    </div>
  );
}
