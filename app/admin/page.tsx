"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Purchase = {
  id: string;
  email: string;
  status: string;
  created_at: string;
  products: { name: string };
};

export default function AdminPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, revenue: 0, conversion: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) return router.push("/dashboard");

      const { data } = await supabase
        .from("purchases")
        .select("*, products(name)")
        .order("created_at", { ascending: false });

      const paid = (data || []).filter((p) => p.status === "paid");
      const total = data?.length || 0;

      setPurchases(data || []);
      setStats({
        total,
        paid: paid.length,
        revenue: paid.length * 97,
        conversion: total > 0 ? Math.round((paid.length / total) * 100) : 0,
      });
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "3px solid #EC4899", borderTopColor: "transparent",
            margin: "0 auto 16px", animation: "spin 0.7s linear infinite",
          }} />
          <p style={{ color: "#F9A8D4" }}>Carregando painel...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  const statCards = [
    {
      label: "Checkouts iniciados",
      value: stats.total,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "#8B5CF6", bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.3)",
    },
    {
      label: "Vendas confirmadas",
      value: stats.paid,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "#10B981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)",
    },
    {
      label: "Faturamento total",
      value: `R$ ${stats.revenue.toLocaleString("pt-BR")}`,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "#EC4899", bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.3)",
    },
    {
      label: "Taxa de conversão",
      value: `${stats.conversion}%`,
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0F172A", color: "white" }}>

      {/* Header */}
      <header style={{
        background: "#1E293B", borderBottom: "1px solid rgba(249,168,212,0.1)",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "8px",
            background: "linear-gradient(135deg, #EC4899, #BE185D)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>Painel Admin</span>
        </div>

        <Link
          href="/dashboard"
          style={{
            color: "#F9A8D4", textDecoration: "none", fontSize: "0.8rem",
            fontWeight: 600, display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ir para o curso
        </Link>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "1.4rem",
            color: "#EC4899", marginBottom: "4px",
          }}>
            Visão geral
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.8rem",
            fontWeight: 700, color: "white",
          }}>
            Kit Agenda Cheia
          </h1>
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px", marginBottom: "40px",
        }}>
          {statCards.map((card) => (
            <div key={card.label} style={{
              background: "#1E293B", borderRadius: "20px",
              border: `1px solid ${card.border}`,
              padding: "24px",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "10px",
                background: card.bg, color: card.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px",
              }}>
                {card.icon}
              </div>
              <p style={{ fontSize: "1.8rem", fontWeight: 700, color: card.color, fontFamily: "var(--font-heading)", marginBottom: "4px" }}>
                {card.value}
              </p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* Purchases table */}
        <div style={{
          background: "#1E293B", borderRadius: "20px",
          border: "1px solid rgba(249,168,212,0.1)",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "20px 24px", borderBottom: "1px solid rgba(249,168,212,0.1)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>Todas as compras</h2>
            <span style={{
              background: "rgba(236,72,153,0.15)", color: "#EC4899",
              fontSize: "0.75rem", fontWeight: 600,
              padding: "4px 12px", borderRadius: "999px",
              border: "1px solid rgba(236,72,153,0.3)",
            }}>
              {purchases.length} registros
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  {["E-mail", "Produto", "Status", "Data"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "12px 20px",
                      fontSize: "0.75rem", fontWeight: 600,
                      color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchases.map((p, i) => (
                  <tr key={p.id} style={{
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}>
                    <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "rgba(255,255,255,0.85)" }}>
                      {p.email}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}>
                      {p.products?.name || "—"}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        padding: "4px 12px", borderRadius: "999px",
                        fontSize: "0.75rem", fontWeight: 600,
                        ...(p.status === "paid"
                          ? { background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }
                          : p.status === "pending"
                          ? { background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }
                          : { background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }
                        ),
                      }}>
                        {p.status === "paid" ? "Pago" : p.status === "pending" ? "Pendente" : "Reembolsado"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
                      {new Date(p.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
                {purchases.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{
                      padding: "48px 24px", textAlign: "center",
                      color: "rgba(255,255,255,0.3)", fontSize: "0.9rem",
                    }}>
                      Nenhuma compra ainda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
