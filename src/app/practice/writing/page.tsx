"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { WritingView } from "./writing-view";

export default function WritingPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải đề viết…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu luyện viết." />;

  return (
    <WritingView
      bundle={bundle.data}
      aiConfigured={false}
      aiModel="local-demo-v1"
      aiLabel="Local demo"
    />
  );
}
