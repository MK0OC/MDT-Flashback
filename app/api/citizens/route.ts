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

    const citizens = await prisma.citizen.findMany({
        orderBy: [{ firstname: "asc" }, { lastname: "asc" }, {createdAt: "asc"}]
    })

    return NextResponse.json(citizens);
}