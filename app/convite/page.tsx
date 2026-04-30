"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main style={{ background: "#FDF2F8", color: "#831843", fontFamily: "var(--font-body)" }}>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #831843 0%, #9D174D 40%, #BE185D 70%, #EC4899 100%)",
        color: "white", padding: "72px 24px 80px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
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

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "6px 18px",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em",
          marginBottom: "28px", color: "#FDF2F8",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#86EFAC", display: "inline-block" }} />
          Para esteticistas que já tentaram de tudo e a agenda continua vazia
        </div>

        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
          color: "#FDF2F8", opacity: 0.9, marginBottom: "8px",
        }}>
          E se na segunda-feira você abrisse o celular e
        </p>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 5.5vw, 3.6rem)",
          fontWeight: 700, lineHeight: 1.15,
          maxWidth: "820px", margin: "0 auto 24px", color: "white",
        }}>
          já tivesse 3 mensagens de clientes novas<br />
          <span style={{ color: "#F9A8D4" }}>pedindo para agendar horário?</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)", maxWidth: "600px",
          margin: "0 auto 40px", opacity: 0.9, lineHeight: 1.7, color: "#FDF2F8",
        }}>
          O Kit Agenda Cheia é o passo a passo para esteticistas que querem parar de
          depender de indicação e ter clientes novas aparecendo todo dia — com R$15 e o celular.
        </p>

        <Link
          href="/checkout"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            color: "white", fontWeight: 700, fontSize: "1.15rem",
            padding: "18px 44px", borderRadius: "999px",
            textDecoration: "none", boxShadow: "0 8px 32px rgba(139,92,246,0.45)",
          }}
        >
          Quero clientes novas essa semana por R$97 →
        </Link>

        <div style={{
          display: "flex", justifyContent: "center", gap: "24px",
          flexWrap: "wrap", marginTop: "24px",
          fontSize: "13px", color: "rgba(253,242,248,0.8)",
        }}>
          {["Acesso imediato", "Garantia de 7 dias", "Compra 100% segura"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
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
          Você já viveu alguma dessas?
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
          fontWeight: 700, textAlign: "center", marginBottom: "48px", color: "#831843",
        }}>
          Se sim, isso aqui foi feito exatamente para você
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            "Abrir a agenda na segunda e ver horários vagos na quinta e na sexta...",
            "Gastar R$50 impulsionando post no Instagram e não vir uma mensagem sequer...",
            "Sua amiga esteticista com agenda cheia e você sem entender o que ela faz diferente...",
            "Só ter cliente nova quando alguma cliente já sua indica — e isso não dá para planejar...",
            "Postar foto do antes e depois todo dia, receber curtida de todo mundo e agendamento de ninguém...",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "16px",
              background: "white", borderRadius: "16px", padding: "20px 24px",
              boxShadow: "0 2px 16px rgba(236,72,153,0.08)", border: "1px solid #FBCFE8",
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
          textAlign: "center", marginTop: "40px", padding: "28px 32px", borderRadius: "20px",
          background: "linear-gradient(135deg, #FDF2F8, #FCE7F3)", border: "1px solid #F9A8D4",
        }}>
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: "1.2rem",
            fontWeight: 600, color: "#BE185D", lineHeight: 1.6,
          }}>
            Não é falta de talento. Não é falta de esforço.<br />
            É que ninguém te ensinou a aparecer para clientes novas — até agora.
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
            O que você vai aprender
          </p>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            fontWeight: 700, textAlign: "center", marginBottom: "12px", color: "#831843",
          }}>
            7 aulas direto ao ponto — sem enrolação, sem teoria inútil
          </h2>
          <p style={{
            textAlign: "center", color: "#BE185D", marginBottom: "48px",
            fontSize: "1rem", lineHeight: 1.6,
          }}>
            Cada aula tem uma ação concreta para você executar no mesmo dia
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                num: "01",
                titulo: "Por que você posta todo dia e nenhuma cliente nova aparece",
                desc: "O erro simples que faz o Instagram te ignorar — e como virar isso em 24h",
              },
              {
                num: "02",
                titulo: "Como criar seu anúncio em 15 minutos sem saber nada de tecnologia",
                desc: "Print de cada tela para você copiar exatamente, do zero ao botão de publicar",
              },
              {
                num: "03",
                titulo: "O que falar no vídeo para a mulher parar o dedo e pedir para agendar",
                desc: "Roteiro pronto — você só grava 30 segundos no celular dentro do seu estúdio",
              },
              {
                num: "04",
                titulo: "Como aparecer só para mulheres na sua cidade que nunca ouviram falar de você",
                desc: "A configuração exata que faz seu anúncio chegar no perfil certo, não para todo mundo",
              },
              {
                num: "05",
                titulo: "O que responder quando a cliente perguntar 'quanto é?' no WhatsApp",
                desc: "5 mensagens prontas que transformam curiosa em cliente com horário marcado",
              },
              {
                num: "06",
                titulo: "Como fazer a cliente que veio uma vez voltar toda semana",
                desc: "A sequência de mensagens que faz ela remarcar antes de sair da sua cabine",
              },
              {
                num: "07",
                titulo: "Como manter a agenda cheia no mês seguinte sem aumentar o investimento",
                desc: "O sistema de reaproveitamento que faz R$15 por dia trabalhar por você todo mês",
              },
            ].map((m) => (
              <div key={m.num} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                padding: "20px 24px", borderRadius: "16px",
                background: "#FDF2F8", border: "1px solid #FBCFE8",
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "8px", opacity: 0.9 }}>
              + Bônus
            </p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "20px" }}>
              Você não precisa criar nada do zero — já está tudo pronto aqui
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "10 roteiros de vídeo prontos para diferentes serviços (limpeza de pele, sobrancelha, depilação e mais)",
                "Planilha para você saber exatamente quantas clientes entraram, quantas agendaram e quanto entrou no caixa",
                "5 modelos de Stories para você postar enquanto o anúncio roda e não ficar dependendo só dele",
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    marginTop: "2px",
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
          background: "white", borderRadius: "24px", padding: "48px 40px",
          boxShadow: "0 4px 32px rgba(236,72,153,0.1)", border: "1px solid #FBCFE8",
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
            Você aplica, coloca o anúncio no ar, usa os roteiros — e em 7 dias
            não apareceu nenhuma mensagem de cliente nova?
            Devolvemos <strong>100% do seu dinheiro</strong>. Sem burocracia, sem pergunta.
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
          Chega de semana com horário vago
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 700, marginBottom: "16px", color: "white",
          maxWidth: "700px", margin: "0 auto 16px",
        }}>
          Na semana que vem você já pode acordar com mensagem de cliente nova no celular
        </h2>
        <p style={{ color: "rgba(253,242,248,0.8)", marginBottom: "40px", fontSize: "1rem" }}>
          Por R$97 — menos do que você perde com um horário vago na semana.
        </p>

        <Link
          href="/checkout"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            color: "white", fontWeight: 700, fontSize: "1.2rem",
            padding: "20px 52px", borderRadius: "999px",
            textDecoration: "none", boxShadow: "0 8px 32px rgba(139,92,246,0.5)",
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
