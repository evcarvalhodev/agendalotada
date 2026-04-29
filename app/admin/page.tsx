"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  const [stats, setStats] = useState({ total: 0, paid: 0, revenue: 0 });
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

      setPurchases(data || []);
      setStats({
        total: data?.length || 0,
        paid: paid.length,
        revenue: paid.length * 97,
      });
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando painel...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4">
        <h1 className="font-bold text-lg">Painel Admin</h1>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-gray-500 text-sm mt-1">Checkouts iniciados</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
            <p className="text-gray-500 text-sm mt-1">Vendas confirmadas</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-purple-600">
              R$ {stats.revenue.toLocaleString("pt-BR")}
            </p>
            <p className="text-gray-500 text-sm mt-1">Faturamento total</p>
          </div>
        </div>

        {/* Tabela de vendas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Todas as compras</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-6 py-3">E-mail</th>
                  <th className="text-left px-6 py-3">Produto</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{p.email}</td>
                    <td className="px-6 py-4 text-gray-600">{p.products?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : p.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {p.status === "paid" ? "Pago" : p.status === "pending" ? "Pendente" : "Reembolsado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(p.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
