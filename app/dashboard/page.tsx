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

      const { data } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .order("order");

      setModules(data || []);
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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando seu curso...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-purple-700 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">Kit Agenda Cheia</h1>
        <button onClick={handleLogout} className="text-purple-200 hover:text-white text-sm">
          Sair
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Seu curso</h2>

        <div className="space-y-6">
          {modules
            .sort((a, b) => a.order - b.order)
            .map((mod) => (
              <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-purple-50 px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-purple-800">{mod.title}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {mod.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/dashboard/aula/${lesson.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-700 text-sm">▶</span>
                        </div>
                        <span className="text-gray-800">{lesson.title}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
