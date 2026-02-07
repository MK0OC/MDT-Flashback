import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id: userId } = await params;

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

  const body = await request.json();
  const { mdtAccess } = body;

  if (!Array.isArray(mdtAccess) || mdtAccess.length === 0) {
    return NextResponse.json({ error: "Au moins un MDT doit être sélectionné." }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      mdtAccess: { set: mdtAccess },
      status: "ACTIVE",
    },
  });

  return NextResponse.json(updatedUser);
};

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id: userId } = await params;
    
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

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json(deletedUser);
};
