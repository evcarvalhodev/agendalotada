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
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Carregando aula...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header className="px-6 py-4 flex items-center gap-4 border-b border-gray-800">
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm">
          ← Voltar ao curso
        </Link>
        <span className="text-gray-600">|</span>
        <span className="text-gray-400 text-sm">{lesson.module.title}</span>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">{lesson.title}</h1>

        {/* Player YouTube */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtube_id}?rel=0&modestbranding=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
