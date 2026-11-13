"use client";

import Link from "next/link";
import { AlertTriangle, Loader2, RotateCcw } from "lucide-react";
import { Button, Card, buttonClass } from "@/components/ui";

export function PageLoading({ label = "Đang tải dữ liệu…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      {label}
    </div>
  );
}

export function PageError({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-lg py-16">
      <Card className="p-6 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-navy">Không tải được dữ liệu</h1>
        <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              window.location.reload();
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Thử lại
          </Button>
          <Link href="/" className={buttonClass({ variant: "soft" })}>
            Về trang chủ
          </Link>
        </div>
      </Card>
    </div>
  );
}
