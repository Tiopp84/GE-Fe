import type { Metadata } from "next";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { ListeningView } from "./listening-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luyện nghe",
};

export default async function ListeningPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return <ListeningView bundle={bundle} />;
}
