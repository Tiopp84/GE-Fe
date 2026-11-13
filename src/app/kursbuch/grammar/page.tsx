"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useDefaultLessonBundle } from "@/lib/use-content";
import { GrammarView } from "./grammar-view";

export default function GrammarPage() {
  const bundle = useDefaultLessonBundle();

  if (bundle.loading) return <PageLoading label="Đang tải ngữ pháp…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Chưa có dữ liệu ngữ pháp." />;

  return <GrammarView bundle={bundle.data} />;
}
