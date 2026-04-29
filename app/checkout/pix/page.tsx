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
  const [copied, setCopied] = useState(false);

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

  async function handleCopy() {
    if (!pixData) return;
    await navigator.clipboard.writeText(pixData.copiaecola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (paid) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 700, color: "#831843" }}>
          Pagamento confirmado!
        </p>
        <p style={{ color: "#BE185D", marginTop: "8px" }}>Redirecionando para o seu acesso...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "white", borderRadius: "24px", padding: "36px 32px",
      width: "100%", maxWidth: "440px",
      boxShadow: "0 4px 32px rgba(236,72,153,0.12)",
      border: "1px solid #FBCFE8",
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "var(--font-display)", fontSize: "1.6rem",
        color: "#EC4899", marginBottom: "4px",
      }}>
        Só falta isso!
      </p>
      <h1 style={{
        fontFamily: "var(--font-heading)", fontSize: "1.5rem",
        fontWeight: 700, color: "#831843", marginBottom: "8px",
      }}>
        Pague com PIX
      </h1>
      <p style={{ color: "#BE185D", fontSize: "0.9rem", marginBottom: "28px" }}>
        Escaneie o QR Code ou copie o código
      </p>

      {pixData ? (
        <>
          {/* QR Code */}
          <div style={{
            background: "#FDF2F8", borderRadius: "20px",
            padding: "20px", marginBottom: "20px",
            border: "1px solid #FBCFE8", display: "inline-block",
          }}>
            <img
              src={`data:image/png;base64,${pixData.qrcode}`}
              alt="QR Code PIX"
              style={{ width: 200, height: 200, display: "block" }}
            />
          </div>

          <button
            onClick={handleCopy}
            style={{
              width: "100%", cursor: "pointer",
              background: copied ? "linear-gradient(135deg, #D1FAE5, #A7F3D0)" : "white",
              border: `2px solid ${copied ? "#059669" : "#EC4899"}`,
              color: copied ? "#059669" : "#EC4899",
              fontWeight: 700, fontSize: "0.95rem",
              padding: "14px", borderRadius: "12px",
              marginBottom: "16px", transition: "all 200ms",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            {copied ? (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Código copiado!
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar código PIX
              </>
            )}
          </button>

          {/* Status */}
          <div style={{
            background: "#FDF2F8", border: "1px solid #FBCFE8",
            borderRadius: "12px", padding: "14px 16px",
            fontSize: "0.875rem", color: "#BE185D",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          }}>
            {checking ? (
              <>
                <span style={{
                  width: 14, height: 14, borderRadius: "50%",
                  border: "2px solid #EC4899", borderTopColor: "transparent",
                  display: "inline-block", animation: "spin 0.7s linear infinite",
                }} />
                Verificando pagamento...
              </>
            ) : (
              <>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#FCD34D", display: "inline-block",
                }} />
                Aguardando confirmação do PIX...
              </>
            )}
          </div>
        </>
      ) : (
        <div style={{ padding: "48px 0", color: "#BE185D" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            border: "3px solid #EC4899", borderTopColor: "transparent",
            margin: "0 auto 16px", animation: "spin 0.7s linear infinite",
          }} />
          Gerando QR Code...
        </div>
      )}

      <p style={{ fontSize: "0.78rem", color: "#BE185D", marginTop: "20px", lineHeight: 1.6 }}>
        Você será redirecionada automaticamente após o pagamento.<br />
        Acesso enviado para: <strong>{email}</strong>
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PixPage() {
  return (
    <main style={{
      minHeight: "100vh", background: "#FDF2F8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <Suspense fallback={
        <div style={{ color: "#BE185D" }}>Carregando...</div>
      }>
        <PixContent />
      </Suspense>
    </main>
  );
}
