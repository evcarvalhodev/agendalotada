import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="bg-purple-700 text-white py-20 px-6 text-center">
        <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Para Esteticistas e Profissionais da Beleza
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto mb-6">
          Sua Agenda Cheia em 7 Dias Usando R$15 por Dia e o Seu Próprio Celular
        </h1>
        <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-10">
          O kit completo para esteticistas conseguirem clientes novos todo dia — sem depender
          de indicação, sem agência e sem precisar entender nada de tráfego pago.
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg px-10 py-4 rounded-full transition-colors"
        >
          Quero minha Agenda Cheia por R$97 →
        </Link>
        <p className="text-purple-200 text-sm mt-4">
          ⚡ Acesso imediato após o pagamento
        </p>
      </section>

      {/* DORES */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Você se identifica com alguma dessas situações?</h2>
        <ul className="space-y-4 text-lg">
          {[
            "Acorda toda semana sem saber se vai ter clientes...",
            "Posta no Instagram mas o retorno é quase zero...",
            "Já perdeu dinheiro com impulsionamento e não veio resultado...",
            "Depende de indicação para sobreviver e isso não é previsível...",
            "Sua agenda tem horários vazios toda semana e isso te angustia...",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-xl">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-center mt-10 text-xl font-semibold text-purple-700">
          Se você se identificou com pelo menos uma, o Kit Agenda Cheia foi criado para você.
        </p>
      </section>

      {/* O QUE RECEBE */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Tudo que você recebe hoje por R$97</h2>
          <div className="space-y-4">
            {[
              { titulo: "Módulo 1", desc: "Por que sua agenda está vazia e como mudar em 7 dias" },
              { titulo: "Módulo 2", desc: "Como criar sua conta no Meta Ads em 15 minutos (mesmo sem experiência)" },
              { titulo: "Módulo 3", desc: "A oferta irresistível que faz clientes quererem marcar horário na hora" },
              { titulo: "Módulo 4", desc: "O roteiro de vídeo pronto — você só grava no celular" },
              { titulo: "Módulo 5", desc: "A campanha no Meta passo a passo com print de cada configuração" },
              { titulo: "Módulo 6", desc: "Os 5 scripts de WhatsApp para transformar lead em cliente agendado" },
              { titulo: "Módulo 7", desc: "Como manter a agenda cheia todo mês sem aumentar o investimento" },
            ].map((m, i) => (
              <div key={i} className="flex gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <span className="text-purple-700 font-bold text-sm whitespace-nowrap">{m.titulo}</span>
                <span className="text-gray-700">{m.desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <h3 className="font-bold text-lg">+ 3 Bônus Exclusivos:</h3>
            {[
              "Planilha de Controle de Leads e Agendamentos",
              "10 Roteiros de Vídeo Prontos para diferentes serviços",
              "Modelos de Stories para postar enquanto o anúncio roda",
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Garantia de 7 dias</h2>
          <p className="text-gray-700">
            Se você aplicar o sistema e não conseguir nenhum cliente novo em 7 dias,
            devolvo 100% do seu dinheiro. Sem burocracia, sem perguntas.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-purple-700 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Comece hoje. Sua agenda cheia em 7 dias.</h2>
        <p className="text-purple-200 mb-8">Preço de lançamento. Sobe para R$197 em breve.</p>
        <Link
          href="/checkout"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-12 py-5 rounded-full transition-colors"
        >
          Quero o Kit Agenda Cheia por R$97 →
        </Link>
        <p className="text-purple-200 text-sm mt-4">⚡ Acesso imediato • 🔒 Compra 100% segura • ↩ Garantia de 7 dias</p>
      </section>
    </main>
  );
}
