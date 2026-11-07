import type { Metadata } from "next";
import { Suspense } from "react";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { ArbeitsbuchView } from "./arbeitsbuch-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thư viện bài tập Arbeitsbuch",
};

export default async function ArbeitsbuchPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-muted">Đang tải bài tập…</div>}>
      <ArbeitsbuchView bundle={bundle} />
    </Suspense>
  );
}
