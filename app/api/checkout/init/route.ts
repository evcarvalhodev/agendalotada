import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const EFI_CLIENT_ID = process.env.EFI_CLIENT_ID!;
const EFI_CLIENT_SECRET = process.env.EFI_CLIENT_SECRET!;
const EFI_PIX_KEY = process.env.EFI_PIX_KEY!;
const EFI_SANDBOX = process.env.EFI_SANDBOX === "true";
const BASE_URL = EFI_SANDBOX
  ? "https://pix-h.api.efipay.com.br"
  : "https://pix.api.efipay.com.br";

async function getEfiToken() {
  const credentials = Buffer.from(`${EFI_CLIENT_ID}:${EFI_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ grant_type: "client_credentials" }),
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  const admin = supabaseAdmin();

  // Busca produto
  const { data: product } = await admin
    .from("products")
    .select("id, price")
    .eq("slug", "kit-esteticistas")
    .single();

  if (!product) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

  // Registra tentativa de checkout
  await admin.from("checkout_attempts").insert({
    email: email.toLowerCase(),
    product_id: product.id,
  });

  // Cria cobrança PIX na Efí
  const token = await getEfiToken();
  const txid = `INFOPROD${Date.now()}`;

  const chargeRes = await fetch(`${BASE_URL}/v2/cob/${txid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      calendario: { expiracao: 3600 },
      devedor: { nome: name, email: email },
      valor: { original: (product.price / 100).toFixed(2) },
      chave: EFI_PIX_KEY,
      infoAdicionais: [{ nome: "Produto", valor: "Kit Agenda Cheia" }],
    }),
  });

  if (!chargeRes.ok) {
    const err = await chargeRes.json();
    console.error("Efí error:", err);
    return NextResponse.json({ error: "Erro ao criar cobrança PIX" }, { status: 500 });
  }

  const charge = await chargeRes.json();

  // Busca QR Code
  const qrRes = await fetch(`${BASE_URL}/v2/loc/${charge.loc.id}/qrcode`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qrData = await qrRes.json();

  // Registra purchase como pending
  await admin.from("purchases").insert({
    email: email.toLowerCase(),
    product_id: product.id,
    payment_id: txid,
    status: "pending",
  });

  return NextResponse.json({
    txid,
    pixQrCode: qrData.imagemQrcode,
    copiaecola: qrData.qrcode,
  });
}
