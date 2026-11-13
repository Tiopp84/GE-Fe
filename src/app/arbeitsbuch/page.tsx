"use client";

import { Suspense } from "react";
import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { ArbeitsbuchView } from "./arbeitsbuch-view";

export default function ArbeitsbuchPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải bài tập…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu bài tập." />;

  return (
    <Suspense fallback={<PageLoading label="Đang tải bài tập…" />}>
      <ArbeitsbuchView bundle={bundle.data} />
    </Suspense>
  );
}
