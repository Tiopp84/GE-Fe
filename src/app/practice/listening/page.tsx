"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { ListeningView } from "./listening-view";

export default function ListeningPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải bài nghe…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu bài nghe." />;

  return <ListeningView bundle={bundle.data} />;
}
