"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao iniciar checkout");

      // Redireciona para a página de pagamento do Efí (PIX ou link)
      if (data.pixQrCode) {
        router.push(`/checkout/pix?email=${encodeURIComponent(form.email)}&txid=${data.txid}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kit Agenda Cheia</h1>
          <p className="text-gray-500 mt-1">Preencha seus dados para continuar</p>
          <div className="mt-4 bg-purple-50 rounded-xl p-4">
            <p className="text-purple-700 font-semibold text-lg">R$ 97,00</p>
            <p className="text-purple-500 text-sm">Acesso vitalício</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="seu@email.com"
            />
            <p className="text-xs text-gray-400 mt-1">Use o e-mail que você vai usar para acessar o curso</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            {loading ? "Aguarde..." : "Pagar com PIX →"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Compra 100% segura • Garantia de 7 dias
        </p>
      </div>
    </main>
  );
}
