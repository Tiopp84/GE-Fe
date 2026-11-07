import type { Metadata } from "next";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { WritingView } from "./writing-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luyện viết · Writing",
};

export default async function WritingPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return (
    <WritingView
      bundle={bundle}
      aiConfigured={false}
      aiModel="local-demo-v1"
      aiLabel="Local demo"
    />
  );
}
