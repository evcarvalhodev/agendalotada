"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Module = {
  id: string;
  title: string;
  order: number;
  lessons: { id: string; title: string; youtube_id: string; order: number }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [openModule, setOpenModule] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("activated")
        .eq("id", user.id)
        .single();

      if (!profile?.activated) return router.push("/parabens");

      setUserName(user.email?.split("@")[0] || "");

      const { data } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .order("order");

      const sorted = (data || []).map((m: Module) => ({
        ...m,
        lessons: [...m.lessons].sort((a, b) => a.order - b.order),
      })).sort((a: Module, b: Module) => a.order - b.order);

      setModules(sorted);
      if (sorted.length > 0) setOpenModule(sorted[0].id);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#FDF2F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "3px solid #EC4899", borderTopColor: "transparent",
            margin: "0 auto 16px", animation: "spin 0.7s linear infinite",
          }} />
          <p style={{ color: "#BE185D", fontFamily: "var(--font-heading)" }}>Carregando seu curso...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#FDF2F8" }}>

      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #831843, #BE185D)",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 16px rgba(131,24,67,0.3)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem" }}>
            Kit Agenda Cheia
          </span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            color: "white", fontSize: "0.8rem", fontWeight: 600,
            padding: "7px 16px", borderRadius: "999px", cursor: "pointer",
            transition: "background 150ms",
          }}
        >
          Sair
        </button>
      </header>

      {/* Welcome */}
      <div style={{
        background: "linear-gradient(135deg, #FCE7F3, #FDF2F8)",
        borderBottom: "1px solid #FBCFE8",
        padding: "32px 24px",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "1.6rem",
            color: "#EC4899", marginBottom: "4px",
          }}>
            Olá, {userName}!
          </p>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.4rem",
            fontWeight: 700, color: "#831843",
          }}>
            Sua jornada para a agenda cheia começa aqui
          </h2>

          {/* Progress hint */}
          <div style={{
            display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "white", borderRadius: "12px",
              padding: "10px 16px", border: "1px solid #FBCFE8",
              fontSize: "0.875rem", color: "#BE185D",
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#EC4899" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas disponíveis
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "white", borderRadius: "12px",
              padding: "10px 16px", border: "1px solid #FBCFE8",
              fontSize: "0.875rem", color: "#BE185D",
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#EC4899" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
              </svg>
              {modules.length} módulos
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {modules.map((mod, idx) => (
            <div key={mod.id} style={{
              background: "white", borderRadius: "20px",
              border: "1px solid #FBCFE8",
              overflow: "hidden",
              boxShadow: openModule === mod.id ? "0 4px 24px rgba(236,72,153,0.12)" : "0 2px 8px rgba(236,72,153,0.06)",
              transition: "box-shadow 200ms",
            }}>
              {/* Module header */}
              <button
                onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                style={{
                  width: "100%", cursor: "pointer",
                  background: openModule === mod.id
                    ? "linear-gradient(135deg, #FCE7F3, #FDF2F8)"
                    : "white",
                  border: "none",
                  padding: "20px 24px",
                  display: "flex", alignItems: "center", gap: "16px",
                  textAlign: "left", transition: "background 150ms",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: "12px", flexShrink: 0,
                  background: openModule === mod.id
                    ? "linear-gradient(135deg, #EC4899, #BE185D)"
                    : "linear-gradient(135deg, #FCE7F3, #FBCFE8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 200ms",
                }}>
                  <span style={{
                    fontFamily: "var(--font-heading)", fontWeight: 700,
                    fontSize: "0.85rem",
                    color: openModule === mod.id ? "white" : "#BE185D",
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "var(--font-heading)", fontWeight: 700,
                    fontSize: "1rem", color: "#831843", marginBottom: "2px",
                  }}>
                    {mod.title}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#BE185D" }}>
                    {mod.lessons.length} {mod.lessons.length === 1 ? "aula" : "aulas"}
                  </p>
                </div>
                <svg
                  width="18" height="18" fill="none" viewBox="0 0 24 24"
                  stroke="#EC4899" strokeWidth={2}
                  style={{
                    flexShrink: 0,
                    transform: openModule === mod.id ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Lessons */}
              {openModule === mod.id && (
                <div style={{ borderTop: "1px solid #FBCFE8" }}>
                  {mod.lessons.map((lesson, li) => (
                    <Link
                      key={lesson.id}
                      href={`/dashboard/aula/${lesson.id}`}
                      style={{
                        display: "flex", alignItems: "center", gap: "16px",
                        padding: "16px 24px",
                        borderBottom: li < mod.lessons.length - 1 ? "1px solid #FDF2F8" : "none",
                        textDecoration: "none",
                        transition: "background 150ms",
                        background: "white",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FDF2F8")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #EC4899, #BE185D)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(236,72,153,0.3)",
                      }}>
                        <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.95rem", color: "#831843", lineHeight: 1.4, fontWeight: 500 }}>
                        {lesson.title}
                      </span>
                      <svg
                        width="16" height="16" fill="none" viewBox="0 0 24 24"
                        stroke="#F9A8D4" strokeWidth={2}
                        style={{ marginLeft: "auto", flexShrink: 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
