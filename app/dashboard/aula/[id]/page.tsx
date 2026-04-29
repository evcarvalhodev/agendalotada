"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Lesson = {
  id: string;
  title: string;
  youtube_id: string;
  module: { title: string };
};

export default function AulaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data } = await supabase
        .from("lessons")
        .select("*, module:modules(title)")
        .eq("id", id)
        .single();

      setLesson(data);
    }
    load();
  }, [id, router]);

  if (!lesson) {
    return (
      <main style={{ minHeight: "100vh", background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "3px solid #EC4899", borderTopColor: "transparent",
            margin: "0 auto 16px", animation: "spin 0.7s linear infinite",
          }} />
          <p style={{ color: "#F9A8D4", fontFamily: "var(--font-heading)" }}>Carregando aula...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#111827", color: "white" }}>

      {/* Header */}
      <header style={{
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", gap: "16px",
        borderBottom: "1px solid rgba(249,168,212,0.15)",
        background: "rgba(17,24,39,0.95)", backdropFilter: "blur(8px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link
          href="/dashboard"
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            color: "#F9A8D4", textDecoration: "none",
            fontSize: "0.875rem", fontWeight: 600,
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EC4899")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#F9A8D4")}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao curso
        </Link>

        <span style={{ color: "rgba(249,168,212,0.3)", fontSize: "1.2rem" }}>|</span>

        <span style={{ color: "rgba(249,168,212,0.7)", fontSize: "0.8rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {lesson.module.title}
        </span>
      </header>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "36px 24px" }}>

        <h1 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 700, color: "white", marginBottom: "28px", lineHeight: 1.3,
        }}>
          {lesson.title}
        </h1>

        {/* Video player */}
        <div style={{
          position: "relative", paddingBottom: "56.25%",
          borderRadius: "20px", overflow: "hidden",
          boxShadow: "0 8px 40px rgba(236,72,153,0.2)",
          border: "1px solid rgba(249,168,212,0.15)",
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtube_id}?rel=0&modestbranding=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%", border: "none",
            }}
          />
        </div>

        {/* Navigation footer */}
        <div style={{
          marginTop: "32px", padding: "20px 24px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(249,168,212,0.15)",
          borderRadius: "16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px", flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontSize: "0.75rem", color: "rgba(249,168,212,0.6)", marginBottom: "2px" }}>Módulo</p>
            <p style={{ fontSize: "0.9rem", color: "#F9A8D4", fontWeight: 600 }}>{lesson.module.title}</p>
          </div>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #EC4899, #BE185D)",
              color: "white", fontWeight: 700, fontSize: "0.9rem",
              padding: "10px 20px", borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(236,72,153,0.35)",
              transition: "opacity 150ms",
            }}
          >
            Ver todas as aulas
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
