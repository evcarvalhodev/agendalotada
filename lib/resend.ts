import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
const FROM_EMAIL = "noreply@seudominio.com.br";

export async function sendWelcomeEmail(email: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "🎉 Sua compra foi confirmada! Acesse agora",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7c3aed;">Parabéns pela sua compra!</h1>
        <p>Sua compra foi confirmada com sucesso. Agora é só criar sua conta e começar.</p>
        <a href="${APP_URL}/parabens?email=${encodeURIComponent(email)}"
           style="display:inline-block; background:#7c3aed; color:white; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; margin:20px 0;">
          Criar minha conta e acessar agora →
        </a>
        <p style="color:#666; font-size:14px;">Se você não realizou essa compra, ignore este email.</p>
      </div>
    `,
  });
}

export async function sendAbandonedCheckoutEmail(email: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Você esqueceu algo... 👀",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7c3aed;">Você quase tinha!</h1>
        <p>Você iniciou a compra mas não finalizou. O seu acesso ainda está reservado.</p>
        <a href="${APP_URL}/checkout"
           style="display:inline-block; background:#7c3aed; color:white; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; margin:20px 0;">
          Finalizar minha compra →
        </a>
        <p style="color:#666; font-size:14px;">Dúvidas? Responda este email.</p>
      </div>
    `,
  });
}
