/**
 * DB helpers — queries Prisma com fallback para mock data quando o banco não está disponível.
 * Substitua os retornos mock por queries reais à medida que o banco for conectado.
 */

import { prisma } from "@/lib/prisma";
import { PROVIDERS, ORDERS_MOCK } from "@/lib/mock-data";

// ─── Providers ────────────────────────────────────────────────────────────────

export async function getProviderById(id: string) {
  if (!prisma) return PROVIDERS.find((p) => p.id === id) ?? null;
  try {
    return await prisma.provider.findUnique({
      where: { id },
      include: { services: { include: { service: true } }, compliments: true },
    });
  } catch {
    return PROVIDERS.find((p) => p.id === id) ?? null;
  }
}

export async function getProvidersByCategory(slug: string) {
  if (!prisma) return PROVIDERS.filter((p) => p.categorySlug === slug);
  try {
    return await prisma.provider.findMany({
      where: { active: true, services: { some: { service: { category: { slug } } } } },
      include: { services: { include: { service: { include: { category: true } } } } },
    });
  } catch {
    return PROVIDERS.filter((p) => p.categorySlug === slug);
  }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function getOrdersByUser(userId: string) {
  if (!prisma) return ORDERS_MOCK;
  try {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { provider: true, items: { include: { service: true } } },
    });
  } catch {
    return ORDERS_MOCK;
  }
}

// ─── Favorites ────────────────────────────────────────────────────────────────

export async function getFavoritesByUser(userId: string) {
  if (!prisma) return PROVIDERS.slice(0, 2);
  try {
    const favs = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    // Return provider IDs so caller can enrich if needed
    return favs;
  } catch {
    return [];
  }
}

export async function isFavorite(userId: string, providerId: string): Promise<boolean> {
  if (!prisma) return false;
  try {
    const fav = await prisma.favorite.findUnique({
      where: { userId_providerId: { userId, providerId } },
    });
    return !!fav;
  } catch {
    return false;
  }
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function getNotificationsByUser(userId: string) {
  if (!prisma) return [];
  try {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  } catch {
    return [];
  }
}

// ─── Conversations ────────────────────────────────────────────────────────────

export async function getConversationsByUser(userId: string) {
  if (!prisma) return [];
  try {
    return await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
  } catch {
    return [];
  }
}

export async function getMessagesByConversation(conversationId: string) {
  if (!prisma) return [];
  try {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  } catch {
    return [];
  }
}
