"use client";

import { Suspense } from "react";
import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { VocabularyView } from "./vocabulary-view";

export default function VocabularyPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải từ vựng…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu từ vựng." />;

  return (
    <Suspense fallback={<PageLoading label="Đang tải từ vựng…" />}>
      <VocabularyView bundle={bundle.data} />
    </Suspense>
  );
}
