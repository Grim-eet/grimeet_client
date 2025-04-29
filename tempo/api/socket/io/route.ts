import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "false",
};

export async function POST(req: NextRequest) {
  // Preflight 요청 처리
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const message = await req.json();

  // Socket.IO 서버에 메시지 브로드캐스트
  if ((global as any).io) {
    (global as any).io.emit("message", JSON.stringify(message));
  }

  return NextResponse.json(message);
}

export async function GET() {
  // Socket.IO 서버 초기화는 별도로 처리
  return NextResponse.json(
    { status: "Socket.IO initialized" },
    {
      headers: corsHeaders,
    }
  );
}
