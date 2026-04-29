"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function ParabensContent() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setError("As senhas não coincidem.");
    if (password.length < 6) return setError("A senha deve ter pelo menos 6 caracteres.");

    setLoading(true);
    setError("");

    try {
      // Verifica se o email tem compra válida
      const check = await fetch(`/api/auth/check-purchase?email=${encodeURIComponent(email)}`);
      const { valid } = await check.json();
      if (!valid) throw new Error("Nenhuma compra encontrada para este e-mail.");

      // Cria conta no Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Se já existe, faz login
        if (signUpError.message.includes("already registered")) {
          const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
          if (loginError) throw new Error("Conta já existe. Verifique sua senha.");
        } else {
          throw new Error(signUpError.message);
        }
      }

      // Ativa a conta
      await fetch("/api/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900">Parabéns pela sua compra!</h1>
        <p className="text-gray-500 mt-2">Crie sua senha para acessar o curso agora</p>
        <div className="bg-purple-50 rounded-lg px-4 py-2 mt-4">
          <p className="text-purple-700 text-sm font-medium">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Criar senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Repita a senha"
          />
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
          {loading ? "Ativando conta..." : "Acessar o curso agora →"}
        </button>
      </form>
    </div>
  );
}

export default function ParabensPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <ParabensContent />
      </Suspense>
    </main>
  );
}
