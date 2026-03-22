import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ORDERS_MOCK } from "@/lib/mock-data";

// GET /api/orders — list user orders
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  if (!prisma) {
    return NextResponse.json({ orders: ORDERS_MOCK });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        provider: true,
        items: { include: { service: true } },
        address: true,
      },
    });
    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ orders: ORDERS_MOCK });
  }
}

// POST /api/orders — create order
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  const body = await req.json();
  const { providerId, services, scheduledAt, total, paidViaClub, addressId } = body;

  if (!providerId || !scheduledAt || !total) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  if (!prisma) {
    // Mock response during development without DB
    return NextResponse.json({
      order: { id: `mock-${Date.now()}`, status: "CONFIRMED", providerId, total },
    });
  }

  try {
    // Use user's default address if not provided
    let resolvedAddressId = addressId;
    if (!resolvedAddressId) {
      const defaultAddress = await prisma.address.findFirst({
        where: { userId, isDefault: true },
      });
      if (!defaultAddress) {
        return NextResponse.json({ error: "Nenhum endereço cadastrado" }, { status: 400 });
      }
      resolvedAddressId = defaultAddress.id;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        providerId,
        addressId: resolvedAddressId,
        scheduledAt: new Date(scheduledAt),
        total,
        paidViaClub: paidViaClub ?? false,
        status: "CONFIRMED",
        items: {
          create: (services as string[]).map((serviceId: string) => ({
            serviceId,
            price: 0, // will be updated from provider service price
            quantity: 1,
          })),
        },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        type: "ORDER_CONFIRMED",
        title: "Pedido confirmado!",
        body: `Seu serviço foi agendado para ${new Date(scheduledAt).toLocaleDateString("pt-BR")}.`,
      },
    });

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}
