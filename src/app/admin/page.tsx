"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  FolderUp,
  Image,
  Loader2,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Badge, Card, buttonClass } from "@/components/ui";

const adminCards = [
  {
    title: "Quản lý nội dung",
    description: "Bài học, từ vựng, ngữ pháp và bài tập.",
    icon: BookOpen,
  },
  {
    title: "Import học liệu",
    description: "CSV, Excel, JSON và tài liệu nguồn.",
    icon: FolderUp,
  },
  {
    title: "Media",
    description: "Audio, PDF và transcript.",
    icon: Image,
  },
  {
    title: "Người dùng",
    description: "Tài khoản và phân quyền.",
    icon: Users,
  },
];

export default function AdminPage() {
  const router = useRouter();
  const { status, user, isAdmin, logout } = useAuth();

  useEffect(() => {
    if (status === "anonymous") {
      router.replace("/login?next=/admin");
    }
  }, [status, router]);

  const signOut = async () => {
    await logout();
    router.replace("/");
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Đang kiểm tra quyền truy cập…
      </div>
    );
  }

  if (status === "anonymous") {
    return <div className="py-20 text-center text-sm text-muted">Đang chuyển đến trang đăng nhập…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg py-16">
        <Card className="p-6 text-center">
          <Badge tone="danger">403</Badge>
          <h1 className="mt-3 text-xl font-extrabold text-navy">Không có quyền admin</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Tài khoản {user?.email ?? ""} chưa được cấp role admin.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/" className={buttonClass({ variant: "secondary" })}>
              Về trang học
            </Link>
            <button type="button" onClick={signOut} className={buttonClass()}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Đăng xuất
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge tone="primary">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            Admin
          </Badge>
          <h1 className="mt-2 text-[28px] font-extrabold tracking-[-0.03em] text-ink">
            Quản trị học liệu
          </h1>
          <p className="mt-1 text-sm text-muted">
            Đăng nhập với {user?.email}. Các chức năng import sẽ được nối API ở bước tiếp theo.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className={buttonClass({ variant: "secondary" })}>
            Về trang học
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button type="button" onClick={signOut} className={buttonClass({ variant: "soft" })}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {adminCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-[#2457b8]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-[15px] font-bold text-navy">{item.title}</h2>
              <p className="mt-1 text-[12px] leading-5 text-muted">{item.description}</p>
              <Badge tone="neutral" className="mt-3">
                Sắp có
              </Badge>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <h2 className="text-[14px] font-bold text-navy">Trạng thái phiên đăng nhập</h2>
        <dl className="mt-3 grid gap-2 text-[12px] sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-[#fbfcff] p-3">
            <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted">Email</dt>
            <dd className="mt-1 font-semibold text-navy">{user?.email}</dd>
          </div>
          <div className="rounded-lg border border-line bg-[#fbfcff] p-3">
            <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted">Role</dt>
            <dd className="mt-1 font-semibold text-navy">{user?.role}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
