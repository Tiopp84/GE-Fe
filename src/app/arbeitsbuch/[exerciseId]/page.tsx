import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError, getExercise } from "@/lib/api";
import { ExerciseRunner } from "./exercise-runner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Làm bài tập",
};

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const { exerciseId } = await params;

  const data = await getExercise(exerciseId).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  });

  return <ExerciseRunner {...data} />;
}
