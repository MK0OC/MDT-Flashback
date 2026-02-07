import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id: citizenId } = await params;
  
    const session = await auth.api.getSession({
      headers: request.headers,
    });
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.interventions.findMany({
        where: {
            citizenId: citizenId
        },
        select: {
            id: true,
            careProvided: true,
            checkup: true,
            clinicalExam: true,
            ata: true,
            createdAt: true,
        },
        orderBy: { createdAt: "asc"},
  });

  return NextResponse.json(users);
};
