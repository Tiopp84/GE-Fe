import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="py-16 text-center text-sm text-muted">Đang tải…</div>}
    >
      <LoginForm />
    </Suspense>
  );
}
