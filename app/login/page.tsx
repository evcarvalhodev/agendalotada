"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword(form);

    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={{
      minHeight: "100vh", background: "#FDF2F8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            color: "#EC4899", marginBottom: "4px",
          }}>
            Bem-vinda de volta
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.4rem",
            fontWeight: 700, color: "#831843",
          }}>
            Acesse seu curso
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "24px", padding: "36px 32px",
          boxShadow: "0 4px 32px rgba(236,72,153,0.12)",
          border: "1px solid #FBCFE8",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{
                display: "block", fontSize: "0.85rem", fontWeight: 600,
                color: "#831843", marginBottom: "8px",
              }}>
                E-mail
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
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
                Senha
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Sua senha"
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
                boxShadow: loading ? "none" : "0 4px 20px rgba(236,72,153,0.35)",
                transition: "opacity 150ms",
              }}
            >
              {loading ? "Entrando..." : "Entrar →"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center", fontSize: "0.875rem",
          color: "#BE185D", marginTop: "20px",
        }}>
          Acabou de comprar?{" "}
          <Link href="/parabens" style={{ color: "#EC4899", fontWeight: 700, textDecoration: "none" }}>
            Crie sua conta aqui
          </Link>
        </p>
      </div>
    </main>
  );
}
