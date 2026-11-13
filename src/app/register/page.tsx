import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={<div className="py-16 text-center text-sm text-muted">Đang tải…</div>}
    >
      <RegisterForm />
    </Suspense>
  );
}
