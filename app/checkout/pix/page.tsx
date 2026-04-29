"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PixContent() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const txid = params.get("txid") || "";
  const [pixData, setPixData] = useState<{ qrcode: string; copiaecola: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    async function fetchPix() {
      const res = await fetch(`/api/checkout/pix?txid=${txid}`);
      const data = await res.json();
      setPixData(data);
    }
    if (txid) fetchPix();
  }, [txid]);

  useEffect(() => {
    if (!txid) return;
    const interval = setInterval(async () => {
      setChecking(true);
      const res = await fetch(`/api/checkout/status?txid=${txid}`);
      const data = await res.json();
      if (data.status === "paid") {
        setPaid(true);
        clearInterval(interval);
        window.location.href = `/parabens?email=${encodeURIComponent(email)}`;
      }
      setChecking(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [txid, email]);

  if (paid) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">✓ Pagamento confirmado!</p>
        <p className="text-gray-500 mt-2">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pague com PIX</h1>
      <p className="text-gray-500 mb-6">Escaneie o QR Code ou copie o código</p>

      {pixData ? (
        <>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <img
              src={`data:image/png;base64,${pixData.qrcode}`}
              alt="QR Code PIX"
              className="w-48 h-48 mx-auto"
            />
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(pixData.copiaecola)}
            className="w-full border-2 border-purple-700 text-purple-700 font-semibold py-3 rounded-xl hover:bg-purple-50 transition-colors mb-4"
          >
            Copiar código PIX
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            {checking ? "Verificando pagamento..." : "Aguardando confirmação do PIX..."}
          </div>
        </>
      ) : (
        <div className="py-12 text-gray-400">Gerando QR Code...</div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        Após o pagamento você será redirecionado automaticamente.<br />
        Acesso enviado para: <strong>{email}</strong>
      </p>
    </div>
  );
}

export default function PixPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <PixContent />
      </Suspense>
    </main>
  );
}
