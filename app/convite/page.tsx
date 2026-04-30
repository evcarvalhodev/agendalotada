"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FDF2F8", color: "#831843", fontFamily: "var(--font-body)" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #831843 0%, #9D174D 40%, #BE185D 70%, #EC4899 100%)",
          color: "white",
          padding: "72px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "rgba(249,168,212,0.15)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "rgba(139,92,246,0.15)", pointerEvents: "none",
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "6px 18px",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em",
          marginBottom: "28px", color: "#FDF2F8",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#86EFAC", display: "inline-block" }} />
          Para Esteticistas e Profissionais da Beleza
        </div>

        {/* Script headline */}
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 2.8rem)",
          color: "#FDF2F8", opacity: 0.9, marginBottom: "8px",
        }}>
          Sua agenda pode estar
        </p>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
          fontWeight: 700, lineHeight: 1.15,
          maxWidth: "780px", margin: "0 auto 24px",
          color: "white",
        }}>
          Lotada em 7 Dias<br />
          <span style={{ color: "#F9A8D4" }}>com R$15 por Dia e o Seu Celular</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)", maxWidth: "580px",
          margin: "0 auto 40px", opacity: 0.9, lineHeight: 1.7,
          color: "#FDF2F8",
        }}>
          O kit completo para esteticistas conquistarem clientes novos todo dia — sem
          agência, sem experiência em tráfego pago e sem gastar uma fortuna.
        </p>

        <Link
          href="/checkout"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            color: "white", fontWeight: 700, fontSize: "1.15rem",
            padding: "18px 44px", borderRadius: "999px",
            textDecoration: "none", boxShadow: "0 8px 32px rgba(139,92,246,0.45)",
            transition: "transform 150ms, box-shadow 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Quero minha Agenda Cheia por R$97 →
        </Link>

        {/* Trust badges */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "24px",
          flexWrap: "wrap", marginTop: "24px",
          fontSize: "13px", color: "rgba(253,242,248,0.8)",
        }}>
          {["Acesso imediato", "Garantia de 7 dias", "Compra 100% segura"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* DORES */}
      <section style={{ padding: "72px 24px", maxWidth: "680px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "1.6rem",
          textAlign: "center", color: "#EC4899", marginBottom: "12px",
        }}>
          Você se identifica?
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
          fontWeight: 700, textAlign: "center", marginBottom: "48px", color: "#831843",
        }}>
          Se você já viveu alguma dessas situações, este kit foi feito para você
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            "Acorda sem saber se vai ter clientes nessa semana...",
            "Posta todo dia no Instagram e o retorno é quase zero...",
            "Já perdeu dinheiro impulsionando post e não veio resultado...",
            "Depende só de indicação e isso não dá previsibilidade...",
            "Olha para a agenda e vê horários vazios — e isso te angustia...",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "16px",
              background: "white", borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 2px 16px rgba(236,72,153,0.08)",
              border: "1px solid #FBCFE8",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span style={{ fontSize: "1rem", lineHeight: 1.6, color: "#831843" }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: "40px",
          padding: "28px 32px", borderRadius: "20px",
          background: "linear-gradient(135deg, #FDF2F8, #FCE7F3)",
          border: "1px solid #F9A8D4",
        }}>
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: "1.25rem",
            fontWeight: 600, color: "#BE185D", lineHeight: 1.5,
          }}>
            O Kit Agenda Cheia resolve isso em 7 dias,<br />
            gastando o preço de uma pizza por dia.
          </p>
        </div>
      </section>

      {/* O QUE RECEBE */}
      <section style={{
        background: "white", padding: "72px 24px",
        borderTop: "1px solid #FBCFE8", borderBottom: "1px solid #FBCFE8",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "1.6rem",
            textAlign: "center", color: "#EC4899", marginBottom: "8px",
          }}>
            O que você recebe
          </p>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700, textAlign: "center", marginBottom: "12px", color: "#831843",
          }}>
            Tudo que você precisa para lotar a agenda
          </h2>
          <p style={{
            textAlign: "center", color: "#BE185D", marginBottom: "48px",
            fontSize: "1rem", lineHeight: 1.6,
          }}>
            7 módulos em vídeo + materiais prontos para usar hoje mesmo
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { num: "01", titulo: "Por que sua agenda está vazia", desc: "Entenda o real motivo e o que mudar nos próximos 7 dias" },
              { num: "02", titulo: "Conta no Meta Ads em 15 minutos", desc: "Passo a passo mesmo para quem nunca abriu a plataforma" },
              { num: "03", titulo: "A oferta irresistível", desc: "O que falar para o cliente querer marcar horário na hora" },
              { num: "04", titulo: "Roteiro de vídeo pronto", desc: "Você só grava no celular — o roteiro já está aqui" },
              { num: "05", titulo: "Campanha no Meta passo a passo", desc: "Print de cada configuração para você copiar exatamente" },
              { num: "06", titulo: "5 scripts de WhatsApp", desc: "Transforme lead em cliente agendado com mensagens prontas" },
              { num: "07", titulo: "Manter a agenda cheia todo mês", desc: "Sem aumentar o investimento, sem depender de viral" },
            ].map((m) => (
              <div key={m.num} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                padding: "20px 24px", borderRadius: "16px",
                background: "#FDF2F8", border: "1px solid #FBCFE8",
                transition: "box-shadow 200ms, transform 200ms",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                  background: "linear-gradient(135deg, #EC4899, #BE185D)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 700, fontSize: "0.85rem",
                  fontFamily: "var(--font-heading)",
                }}>
                  {m.num}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "4px", color: "#831843" }}>{m.titulo}</p>
                  <p style={{ fontSize: "0.9rem", color: "#BE185D", lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus */}
          <div style={{
            marginTop: "40px", padding: "32px",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            borderRadius: "20px", color: "white",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontSize: "1.5rem",
              marginBottom: "20px", opacity: 0.9,
            }}>
              + Bônus exclusivos
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Planilha de Controle de Leads e Agendamentos",
                "10 Roteiros de Vídeo Prontos para diferentes serviços",
                "Modelos de Stories para usar enquanto o anúncio roda",
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{
          maxWidth: "560px", margin: "0 auto", textAlign: "center",
          background: "white", borderRadius: "24px",
          padding: "48px 40px",
          boxShadow: "0 4px 32px rgba(236,72,153,0.1)",
          border: "1px solid #FBCFE8",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.8rem",
            fontWeight: 700, marginBottom: "16px", color: "#831843",
          }}>
            Garantia de 7 dias
          </h2>
          <p style={{ color: "#BE185D", lineHeight: 1.7, fontSize: "1rem" }}>
            Aplique o sistema e não consiga nenhum cliente novo em 7 dias?
            Devolvemos <strong>100% do seu dinheiro</strong>. Sem burocracia, sem perguntas.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{
        background: "linear-gradient(135deg, #831843 0%, #9D174D 50%, #BE185D 100%)",
        padding: "80px 24px", textAlign: "center", color: "white",
      }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "1.8rem",
          marginBottom: "12px", opacity: 0.9,
        }}>
          Comece hoje mesmo
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 700, marginBottom: "16px", color: "white",
        }}>
          Sua agenda lotada em 7 dias
        </h2>
        <p style={{ color: "rgba(253,242,248,0.8)", marginBottom: "40px", fontSize: "1rem" }}>
          Preço de lançamento. Sobe para R$197 em breve.
        </p>

        <Link
          href="/checkout"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            color: "white", fontWeight: 700, fontSize: "1.2rem",
            padding: "20px 52px", borderRadius: "999px",
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(139,92,246,0.5)",
          }}
        >
          Quero o Kit Agenda Cheia por R$97 →
        </Link>

        <div style={{
          display: "flex", justifyContent: "center", gap: "28px",
          flexWrap: "wrap", marginTop: "28px",
          fontSize: "13px", color: "rgba(253,242,248,0.75)",
        }}>
          {["Acesso imediato", "Compra 100% segura", "Garantia de 7 dias"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
