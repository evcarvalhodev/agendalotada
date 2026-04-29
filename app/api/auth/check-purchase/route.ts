import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ valid: false });

  const admin = supabaseAdmin();
  const { data } = await admin
    .from("purchases")
    .select("id")
    .eq("email", email.toLowerCase())
    .eq("status", "paid")
    .limit(1);

  return NextResponse.json({ valid: (data?.length || 0) > 0 });
}
