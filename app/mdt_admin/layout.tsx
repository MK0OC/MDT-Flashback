import { Suspense } from "react";
import Navbar from "@/src/components/ui/navbar/Navbar";
import AdminGuard from "./AdminGuard";
import Loader from "@/src/components/ui/loader/Loader";
import "@/src/styles/mdt_admin/style.scss";

const adminSections = [
  {
    title: "Gestion Admin",
    items: [
      { label: "Acceuil", href: "/mdt_admin" },
      { label: "Utilisateurs", href: "/mdt_admin/users" },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mdt-admin-layout">
      <AdminGuard>
        <Navbar logoSrc="/favicon.ico" sections={adminSections} />
        {children}
      </AdminGuard>
    </div>
  );
}
