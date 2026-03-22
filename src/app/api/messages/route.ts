import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/messages?conversationId=xxx
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json({ error: "conversationId obrigatório" }, { status: 400 });
  }

  if (!prisma) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ messages: [] });
  }
}

// POST /api/messages — send a message
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;
  const { conversationId, content, orderId } = await req.json();

  if (!conversationId || !content) {
    return NextResponse.json({ error: "conversationId e content obrigatórios" }, { status: 400 });
  }

  if (!prisma) {
    return NextResponse.json({
      message: { id: String(Date.now()), content, senderType: "USER", createdAt: new Date() },
    });
  }

  try {
    const message = await prisma.message.create({
      data: {
        conversationId,
        orderId: orderId ?? null,
        senderId: userId,
        senderType: "USER",
        content,
      },
    });

    // Update conversation updatedAt
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
}
