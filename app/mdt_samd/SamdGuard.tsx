import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export default async function SamdGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { status: true, mdtAccess: true },
  });

  if (!user || user.status !== "ACTIVE" || !user.mdtAccess.includes("SAMD")) {
    redirect("/login");
  }

  return <>{children}</>;
}
