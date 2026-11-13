"use client";

import { useParams } from "next/navigation";
import { PageError, PageLoading } from "@/components/data-state";
import { useLessonBundle } from "@/lib/use-content";
import { LessonOverview } from "./lesson-overview";

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const lessonId =
    typeof params.lessonId === "string"
      ? params.lessonId
      : (params.lessonId?.[0] ?? "");
  const bundle = useLessonBundle(lessonId);

  if (bundle.loading) return <PageLoading label="Đang tải bài học…" />;
  if (bundle.error) return <PageError message={bundle.error} />;
  if (!bundle.data) return <PageError message="Không tìm thấy bài học." />;

  return <LessonOverview bundle={bundle.data} />;
}
