import { Suspense } from "react";
import Navbar from "@/src/components/ui/navbar/Navbar";
import SamdGuard from "./SamdGuard";
import Loader from "@/src/components/ui/loader/Loader";
import "@/src/styles/mdt_samd/style.scss";

const samdSections = [
  {
    title: "Général",
    items: [
      { label: "Acceuil", href: "/mdt_samd" },
      { label: "Citoyens", href: "/mdt_samd/citizens" },
    ],
  },
];

export default function SamdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mdt-samd-layout">
      <SamdGuard>
        <Navbar logoSrc="/logo_samd.webp" sections={samdSections} />
        {children}
      </SamdGuard>
    </div>
  );
}
