import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const txid = req.nextUrl.searchParams.get("txid");
  if (!txid) return NextResponse.json({ status: "pending" });

  const admin = supabaseAdmin();
  const { data } = await admin
    .from("purchases")
    .select("status")
    .eq("payment_id", txid)
    .single();

  return NextResponse.json({ status: data?.status || "pending" });
}
