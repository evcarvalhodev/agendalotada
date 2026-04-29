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
    <main style={{
      minHeight: "100vh", background: "#FDF2F8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "1.8rem",
            color: "#EC4899", marginBottom: "4px",
          }}>
            Quase lá!
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.5rem",
            fontWeight: 700, color: "#831843", marginBottom: "8px",
          }}>
            Kit Agenda Cheia
          </h1>
          <p style={{ color: "#BE185D", fontSize: "0.9rem" }}>
            Preencha seus dados para continuar
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "24px", padding: "36px 32px",
          boxShadow: "0 4px 32px rgba(236,72,153,0.12)",
          border: "1px solid #FBCFE8",
        }}>

          {/* Price badge */}
          <div style={{
            background: "linear-gradient(135deg, #FDF2F8, #FCE7F3)",
            border: "1px solid #F9A8D4", borderRadius: "16px",
            padding: "16px 20px", marginBottom: "28px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 700, color: "#831843" }}>
              R$ 97,00
            </p>
            <p style={{ fontSize: "0.85rem", color: "#BE185D", marginTop: "2px" }}>
              Acesso vitalício + bônus exclusivos
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{
                display: "block", fontSize: "0.85rem", fontWeight: 600,
                color: "#831843", marginBottom: "8px",
              }}>
                Seu nome
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Como prefere ser chamada"
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
                Seu e-mail
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
              <p style={{ fontSize: "0.78rem", color: "#BE185D", marginTop: "6px" }}>
                Use o e-mail que vai usar para acessar o curso
              </p>
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
                background: loading ? "#D1D5DB" : "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                color: "white", fontWeight: 700, fontSize: "1.05rem",
                padding: "16px", borderRadius: "12px", border: "none",
                boxShadow: loading ? "none" : "0 4px 20px rgba(139,92,246,0.4)",
                transition: "opacity 150ms, transform 150ms",
              }}
            >
              {loading ? "Gerando PIX..." : "Pagar com PIX →"}
            </button>
          </form>
        </div>

        {/* Trust */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "20px",
          marginTop: "20px", fontSize: "12px", color: "#BE185D",
          flexWrap: "wrap",
        }}>
          {["Compra segura", "Acesso imediato", "Garantia 7 dias"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
