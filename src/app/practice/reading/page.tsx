import type { Metadata } from "next";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { ReadingView } from "./reading-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luyện đọc",
};

export default async function ReadingPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return <ReadingView bundle={bundle} />;
}
