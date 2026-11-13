"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { SpeakingView } from "./speaking-view";

export default function SpeakingPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải bài nói…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu luyện nói." />;

  return <SpeakingView bundle={bundle.data} />;
}
