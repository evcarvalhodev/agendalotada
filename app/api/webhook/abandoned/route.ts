import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendAbandonedCheckoutEmail } from "@/lib/resend";

// Chamado por cron job (ex: Vercel Cron) a cada hora
// Vercel cron config em vercel.json
export async function GET(req: NextRequest) {
  const admin = supabaseAdmin();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Busca checkouts abandonados há mais de 1h sem email enviado
  const { data: attempts } = await admin
    .from("checkout_attempts")
    .select("id, email")
    .eq("email_sent", false)
    .lt("created_at", oneHourAgo);

  if (!attempts?.length) return NextResponse.json({ sent: 0 });

  let sent = 0;
  for (const attempt of attempts) {
    // Verifica se não comprou
    const { data: purchase } = await admin
      .from("purchases")
      .select("id")
      .eq("email", attempt.email)
      .eq("status", "paid")
      .limit(1);

    if (purchase?.length) continue; // Já comprou, pula

    await sendAbandonedCheckoutEmail(attempt.email);
    await admin
      .from("checkout_attempts")
      .update({ email_sent: true })
      .eq("id", attempt.id);

    sent++;
  }

  return NextResponse.json({ sent });
}
