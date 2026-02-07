import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (currentUser?.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Unauthorized (> SUPERADMIN)" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      discordId: true,
      email: true,
      role: true,
      status: true,
      mdtAccess: true,
      createdAt: true,
    },
    orderBy: { status: "asc"},
  });

  return NextResponse.json(users);
};
