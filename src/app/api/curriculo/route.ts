import { NextResponse } from "next/server";
import { curriculo } from "@/data/curriculo";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(curriculo);
}
