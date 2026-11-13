"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { ReadingView } from "./reading-view";

export default function ReadingPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải bài đọc…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu bài đọc." />;

  return <ReadingView bundle={bundle.data} />;
}
