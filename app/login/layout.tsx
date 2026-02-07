import { Suspense } from "react";
import "@/src/styles/login/style.scss";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-layout">
      <Suspense>
        {children}
      </Suspense>
    </div>
  );
}
