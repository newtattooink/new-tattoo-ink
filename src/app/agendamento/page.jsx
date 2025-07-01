"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function AgendamentoPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    estilo: "",
    localCorpo: "",
    tamanho: "",
    descricao: "",
    dataPreferida: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setFormData({ ...formData, imagem: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storage = getStorage();
    const imageRef = ref(storage, `agendamentos/${user?.uid}/${formData.imagem?.name}`);

    try {
      if (formData.imagem) {
        await uploadBytes(imageRef, formData.imagem);
        alert("Agendamento enviado com sucesso!");
        // Você pode adicionar aqui o envio para o Firestore depois
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar agendamento.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Agendar Horário</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nome do Cliente</label>
            <input
              type="text"
              value={user?.displayName || "Nome não disponível"}
              disabled
              className="w-full p-2 bg-gray-800 text-white rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Estilo da Tatuagem</label>
            <select
              name="estilo"
              value={formData.estilo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded"
            >
              <option value="">Selecione</option>
              <option value="Realismo">Realismo</option>
              <option value="Old School">Old School</option>
              <option value="Fineline">Fineline</option>
              <option value="Minimalista">Minimalista</option>
              <option value="Blackwork">Blackwork</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Local do Corpo</label>
            <input
              type="text"
              name="localCorpo"
              value={formData.localCorpo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Tamanho Aproximado (cm)</label>
            <input
              type="text"
              name="tamanho"
              value={formData.tamanho}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Descrição da Tatuagem</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Data Preferida</label>
            <input
              type="date"
              name="dataPreferida"
              value={formData.dataPreferida}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Imagem de Referência</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Enviar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}
