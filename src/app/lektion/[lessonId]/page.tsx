import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError, getLessonBundle } from "@/lib/api";
import { LessonOverview } from "./lesson-overview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tổng quan bài học",
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const bundle = await getLessonBundle(lessonId).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  });

  return <LessonOverview bundle={bundle} />;
}
