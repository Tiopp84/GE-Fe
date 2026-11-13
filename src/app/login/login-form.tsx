"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { ApiError } from "@/lib/api";
import { authLandingPath, safeNextPath } from "@/lib/auth-redirect";
import { useAuth } from "@/lib/auth";
import { AuthBrand } from "@/components/auth-brand";
import { Badge, Button, Card } from "@/components/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, user: currentUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = safeNextPath(searchParams.get("next"));
  const confirmed = searchParams.get("confirmed") === "1";
  const registerHref = nextPath
    ? `/register?next=${encodeURIComponent(nextPath)}`
    : "/register";

  useEffect(() => {
    if (status === "authenticated" && currentUser) {
      router.replace(authLandingPath(currentUser.role, nextPath));
    }
  }, [status, currentUser, router, nextPath]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const user = await login(email.trim(), password);
      router.replace(authLandingPath(user.role, nextPath));
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Không đăng nhập được. Vui lòng kiểm tra kết nối và thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 py-10">
      <AuthBrand />

      <Card className="p-6">
        <Badge tone="soft">
          <LogIn className="h-3 w-3" aria-hidden="true" />
          Language Web
        </Badge>
        <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-navy">
          Đăng nhập
        </h1>
        <p className="mt-1 text-[12px] leading-5 text-muted">
          Đăng nhập để tiếp tục học. Tài khoản admin có thêm dashboard quản lý.
        </p>

        {confirmed ? (
          <div
            role="status"
            className="mt-4 rounded-xl border border-[#b9e4ce] bg-success-soft p-3 text-[11px] leading-5 text-success"
          >
            Email đã được xác nhận. Hãy đăng nhập bằng tài khoản vừa tạo.
          </div>
        ) : null}

        <form className="mt-5 space-y-3" onSubmit={submit}>
          <div>
            <label htmlFor="login-email" className="text-[11px] font-semibold text-navy">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] text-navy focus:border-primary/40 focus:outline-none"
              placeholder="ban@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="text-[11px] font-semibold text-navy">
              Mật khẩu
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] text-navy focus:border-primary/40 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-[#f6c9c3] bg-danger-soft p-3 text-[11px] leading-5 text-danger"
            >
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <LogIn className="h-4 w-4" aria-hidden="true" />
            )}
            {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
          </Button>
        </form>

        <p className="mt-4 text-center text-[10px] leading-4 text-muted">
          Chưa có tài khoản?{" "}
          <Link href={registerHref} className="font-semibold text-[#2457b8] hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </Card>
    </div>
  );
}
