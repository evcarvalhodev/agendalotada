import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/resend";

// Webhook da Efí Bank — notifica quando PIX é pago
export async function POST(req: NextRequest) {
  const body = await req.json();
  const admin = supabaseAdmin();

  // A Efí envia array de PIX confirmados
  const pixList = body?.pix || [];

  for (const pix of pixList) {
    const txid = pix.txid;
    if (!txid) continue;

    // Atualiza purchase para "paid"
    const { data: purchase } = await admin
      .from("purchases")
      .update({ status: "paid" })
      .eq("payment_id", txid)
      .eq("status", "pending")
      .select("email")
      .single();

    if (purchase?.email) {
      // Envia email de boas-vindas
      await sendWelcomeEmail(purchase.email);
    }
  }

  return NextResponse.json({ ok: true });
}
