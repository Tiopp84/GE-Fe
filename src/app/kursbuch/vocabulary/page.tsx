import type { Metadata } from "next";
import { Suspense } from "react";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { VocabularyView } from "./vocabulary-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Từ vựng Kursbuch",
};

export default async function VocabularyPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-muted">Đang tải từ vựng…</div>}>
      <VocabularyView bundle={bundle} />
    </Suspense>
  );
}
