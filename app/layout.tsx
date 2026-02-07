import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/global.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MDT Flashback",
  description: "Application MDT Flashback avec authentification Discord",
  icons: {
    icon: "../favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}