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
      const check = await fetch(`/api/auth/check-purchase?email=${encodeURIComponent(email)}`);
      const { valid } = await check.json();
      if (!valid) throw new Error("Nenhuma compra encontrada para este e-mail.");

      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
          if (loginError) throw new Error("Conta já existe. Verifique sua senha.");
        } else {
          throw new Error(signUpError.message);
        }
      }

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
    <div style={{ width: "100%", maxWidth: "440px" }}>

      {/* Celebration header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #EC4899, #BE185D)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 8px 24px rgba(236,72,153,0.35)",
        }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "2rem",
          color: "#EC4899", marginBottom: "6px",
        }}>
          Parabéns!
        </p>
        <h1 style={{
          fontFamily: "var(--font-heading)", fontSize: "1.4rem",
          fontWeight: 700, color: "#831843", marginBottom: "8px",
        }}>
          Sua compra foi confirmada
        </h1>
        <p style={{ color: "#BE185D", fontSize: "0.9rem" }}>
          Crie sua senha para acessar o curso agora mesmo
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: "white", borderRadius: "24px", padding: "36px 32px",
        boxShadow: "0 4px 32px rgba(236,72,153,0.12)",
        border: "1px solid #FBCFE8",
      }}>

        {/* Email badge */}
        <div style={{
          background: "linear-gradient(135deg, #FDF2F8, #FCE7F3)",
          border: "1px solid #F9A8D4", borderRadius: "12px",
          padding: "12px 16px", marginBottom: "24px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#EC4899" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span style={{ fontSize: "0.875rem", color: "#831843", fontWeight: 500 }}>{email}</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{
              display: "block", fontSize: "0.85rem", fontWeight: 600,
              color: "#831843", marginBottom: "8px",
            }}>
              Criar senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              style={{
                width: "100%", border: "1.5px solid #FBCFE8", borderRadius: "12px",
                padding: "14px 16px", fontSize: "1rem", outline: "none",
                color: "#831843", background: "#FDF2F8", boxSizing: "border-box",
                transition: "border-color 150ms",
              }}
              onFocus={(e) => e.target.style.borderColor = "#EC4899"}
              onBlur={(e) => e.target.style.borderColor = "#FBCFE8"}
            />
          </div>

          <div>
            <label style={{
              display: "block", fontSize: "0.85rem", fontWeight: 600,
              color: "#831843", marginBottom: "8px",
            }}>
              Confirmar senha
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repita a senha"
              style={{
                width: "100%", border: "1.5px solid #FBCFE8", borderRadius: "12px",
                padding: "14px 16px", fontSize: "1rem", outline: "none",
                color: "#831843", background: "#FDF2F8", boxSizing: "border-box",
                transition: "border-color 150ms",
              }}
              onFocus={(e) => e.target.style.borderColor = "#EC4899"}
              onBlur={(e) => e.target.style.borderColor = "#FBCFE8"}
            />
          </div>

          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              color: "#DC2626", borderRadius: "12px", padding: "12px 16px",
              fontSize: "0.875rem",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "#D1D5DB" : "linear-gradient(135deg, #EC4899, #BE185D)",
              color: "white", fontWeight: 700, fontSize: "1.05rem",
              padding: "16px", borderRadius: "12px", border: "none",
              boxShadow: loading ? "none" : "0 4px 20px rgba(236,72,153,0.4)",
              transition: "opacity 150ms",
            }}
          >
            {loading ? "Ativando conta..." : "Acessar o curso agora →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ParabensPage() {
  return (
    <main style={{
      minHeight: "100vh", background: "#FDF2F8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <Suspense fallback={<div style={{ color: "#BE185D" }}>Carregando...</div>}>
        <ParabensContent />
      </Suspense>
    </main>
  );
}
