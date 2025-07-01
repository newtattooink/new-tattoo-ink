"use client";
import { useRouter } from "next/navigation";

export default function BotaoVoltar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="absolute top-4 right-4 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition z-[100]"
    >
      Voltar
    </button>
  );
}
