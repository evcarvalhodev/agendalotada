import { NextRequest, NextResponse } from "next/server";

const EFI_CLIENT_ID = process.env.EFI_CLIENT_ID!;
const EFI_CLIENT_SECRET = process.env.EFI_CLIENT_SECRET!;
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

export async function GET(req: NextRequest) {
  const txid = req.nextUrl.searchParams.get("txid");
  if (!txid) return NextResponse.json({ error: "txid obrigatório" }, { status: 400 });

  const token = await getEfiToken();
  const res = await fetch(`${BASE_URL}/v2/cob/${txid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const charge = await res.json();

  const qrRes = await fetch(`${BASE_URL}/v2/loc/${charge.loc.id}/qrcode`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qrData = await qrRes.json();

  return NextResponse.json({
    qrcode: qrData.imagemQrcode,
    copiaecola: qrData.qrcode,
  });
}
