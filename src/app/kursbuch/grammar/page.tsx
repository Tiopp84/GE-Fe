import type { Metadata } from "next";
import { getDefaultLessonId, getLessonBundle } from "@/lib/api";
import { GrammarView } from "./grammar-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ngữ pháp Kursbuch",
};

export default async function GrammarPage() {
  const lessonId = await getDefaultLessonId();
  const bundle = await getLessonBundle(lessonId);

  return <GrammarView bundle={bundle} />;
}
