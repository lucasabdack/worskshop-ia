import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/favorites — toggle favorite
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { providerId } = await req.json();
  if (!providerId) {
    return NextResponse.json({ error: "providerId obrigatório" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  if (!prisma) {
    return NextResponse.json({ favorited: true, mock: true });
  }

  try {
    const existing = await prisma.favorite.findUnique({
      where: { userId_providerId: { userId, providerId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ favorited: false });
    } else {
      await prisma.favorite.create({ data: { userId, providerId } });
      return NextResponse.json({ favorited: true });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar favorito" }, { status: 500 });
  }
}

// GET /api/favorites — list user favorites
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  if (!prisma) {
    return NextResponse.json({ favorites: [] });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ favorites });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ favorites: [] });
  }
}
