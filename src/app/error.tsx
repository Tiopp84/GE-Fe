"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl py-16">
      <div className="rounded-2xl border border-line bg-white p-6 text-center card-shadow">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-navy">Không tải được dữ liệu</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          API backend chưa phản hồi hoặc đang gặp lỗi. Kiểm tra kết nối rồi thử lại.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-[10px] text-muted">Mã lỗi: {error.digest}</p>
        ) : null}
        <Button className="mt-5" onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Thử lại
        </Button>
      </div>
    </div>
  );
}
