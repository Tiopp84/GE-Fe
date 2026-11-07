import type { Metadata } from "next";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { SpeakingView } from "./speaking-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luyện nói",
};

export default async function SpeakingPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return <SpeakingView bundle={bundle} />;
}
