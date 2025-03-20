"use client";

import { useState } from "react";

export default function ContributePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    deadline: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Oportunidade enviada com sucesso!");
        setForm({ title: "", description: "", link: "", deadline: "", contact: "" });
      } else {
        setMessage("Erro ao enviar a oportunidade.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Enviar Oportunidade</h1>

        {message && (
          <p className="text-center text-lg font-semibold mb-4 text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Título da Oportunidade</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o título"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Descrição</label>
            <textarea
              name="description"
              placeholder="Descreva a oportunidade"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Link da Oportunidade</label>
            <input
              type="url"
              name="link"
              placeholder="Insira o link"
              value={form.link}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Prazo Final</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Contato (E-mail)</label>
            <input
              type="email"
              name="contact"
              placeholder="Seu e-mail de contato"
              value={form.contact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Enviar Oportunidade
          </button>
        </form>
      </div>
    </div>
  );
}
