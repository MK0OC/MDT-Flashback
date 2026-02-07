'use client';

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";
import "./Navbar.scss";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavbarProps {
  logoSrc: string;
  sections?: NavSection[];
}

const Navbar = ({ logoSrc, sections = [] }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const isSuperAdmin = (session?.user as { role?: string })?.role === "SUPERADMIN";
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(
    () => {
      const initial: Record<number, boolean> = {};
      sections.forEach((section, index) => {
        const hasActiveItem = section.items.some(
          (item) => item.href === pathname
        );
        initial[index] = hasActiveItem || index === 0;
      });
      return initial;
    }
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="navbar-layout">
      <div className="navbar-header">
        <Image
          src={logoSrc}
          alt="Logo"
          width={70}
          height={70}
          className="navbar-logo"
        />
      </div>
      <div className="navbar-container">
        {sections.map((section, index) => (
          <div key={index} className="navbar-section">
            <button
              className="navbar-section-header"
              onClick={() => toggleSection(index)}
            >
              <span>{section.title}</span>
              <svg
                className={`navbar-chevron ${openSections[index] ? "open" : ""}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openSections[index] && (
              <div className="navbar-section-items">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`navbar-item ${pathname === item.href ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="navbar-footer">
        {isSuperAdmin && !pathname.startsWith("/mdt_admin") ? (
          <a href="/mdt_admin">
            <Button variant="default">Pannel Admin/Staff</Button>
          </a>
        ) : null}
        <div>
          <FontAwesomeIcon icon={faGear} onClick={() => router.push("/settings")} cursor={"pointer"} style={{ marginRight: "16px" }} />
          <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} cursor={"pointer"} />
        </div>
        <p>© xx ⚡ Flashback WL</p>
      </div>
    </nav>
  );
};

export default Navbar;
