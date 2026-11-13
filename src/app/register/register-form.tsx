"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, MailCheck, UserPlus } from "lucide-react";
import { ApiError } from "@/lib/api";
import { authLandingPath, safeNextPath } from "@/lib/auth-redirect";
import { useAuth } from "@/lib/auth";
import { AuthBrand } from "@/components/auth-brand";
import { Badge, Button, Card, buttonClass } from "@/components/ui";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, user: currentUser, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const nextPath = safeNextPath(searchParams.get("next"));
  const loginHref = nextPath
    ? `/login?next=${encodeURIComponent(nextPath)}`
    : "/login";

  useEffect(() => {
    if (status === "authenticated" && currentUser) {
      router.replace(authLandingPath(currentUser.role, nextPath));
    }
  }, [status, currentUser, router, nextPath]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Vui lòng nhập email.");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Mật khẩu cần ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`);
      return;
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
      setError(`Mật khẩu tối đa ${MAX_PASSWORD_LENGTH} ký tự.`);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await register(trimmedEmail, password);

      // Khi Supabase tắt xác nhận email, tài khoản có session ngay và
      // AuthProvider sẽ kích hoạt effect chuyển trang.
      if (result.session) return;

      setRegisteredEmail(result.user.email ?? trimmedEmail);
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Không đăng ký được. Vui lòng kiểm tra kết nối và thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (registeredEmail) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-4 py-10">
        <AuthBrand />

        <Card className="p-6 text-center">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-[#2457b8]">
            <MailCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-navy">
            Kiểm tra email của bạn
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-muted">
            Tài khoản{" "}
            <span className="font-semibold text-navy">{registeredEmail}</span> đã được
            tạo. Mở email xác nhận từ Supabase, bấm liên kết xác nhận rồi đăng nhập.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-muted">
            Không thấy email? Kiểm tra thư rác hoặc liên hệ admin nếu cần gửi lại.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Link href={loginHref} className={buttonClass({ className: "w-full" })}>
              Đến trang đăng nhập
            </Link>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setRegisteredEmail(null);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setError(null);
              }}
            >
              Đăng ký email khác
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 py-10">
      <AuthBrand />

      <Card className="p-6">
        <Badge tone="soft">
          <UserPlus className="h-3 w-3" aria-hidden="true" />
          Tài khoản user
        </Badge>
        <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-navy">
          Đăng ký
        </h1>
        <p className="mt-1 text-[12px] leading-5 text-muted">
          Tạo tài khoản user thường để học. Tài khoản admin do quản trị viên cấp
          riêng, không thể tự đăng ký.
        </p>

        <form className="mt-5 space-y-3" onSubmit={submit}>
          <div>
            <label htmlFor="register-email" className="text-[11px] font-semibold text-navy">
              Email
            </label>
            <input
              id="register-email"
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
            <label htmlFor="register-password" className="text-[11px] font-semibold text-navy">
              Mật khẩu
            </label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] text-navy focus:border-primary/40 focus:outline-none"
              placeholder="••••••••"
            />
            <p className="mt-1 text-[10px] text-muted">
              Từ {MIN_PASSWORD_LENGTH} đến {MAX_PASSWORD_LENGTH} ký tự.
            </p>
          </div>

          <div>
            <label
              htmlFor="register-password-confirm"
              className="text-[11px] font-semibold text-navy"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="register-password-confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
              <UserPlus className="h-4 w-4" aria-hidden="true" />
            )}
            {submitting ? "Đang tạo tài khoản…" : "Đăng ký"}
          </Button>
        </form>

        <p className="mt-4 text-center text-[10px] leading-4 text-muted">
          Đã có tài khoản?{" "}
          <Link href={loginHref} className="font-semibold text-[#2457b8] hover:underline">
            Đăng nhập
          </Link>
        </p>
      </Card>
    </div>
  );
}
