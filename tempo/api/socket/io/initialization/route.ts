import { initSocketIO } from "@/lib/socket-server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  initSocketIO();
  return NextResponse.json({ status: "Socket.IO initialized" });
}
