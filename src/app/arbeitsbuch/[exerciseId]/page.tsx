"use client";

import { useParams } from "next/navigation";
import { PageError, PageLoading } from "@/components/data-state";
import { useExercise } from "@/lib/use-content";
import { ExerciseRunner } from "./exercise-runner";

export default function ExercisePage() {
  const params = useParams<{ exerciseId: string }>();
  const exerciseId =
    typeof params.exerciseId === "string"
      ? params.exerciseId
      : (params.exerciseId?.[0] ?? "");
  const exercise = useExercise(exerciseId);

  if (exercise.loading) return <PageLoading label="Đang tải bài tập…" />;
  if (exercise.error) return <PageError message={exercise.error} />;
  if (!exercise.data) return <PageError message="Không tìm thấy bài tập." />;

  return <ExerciseRunner {...exercise.data} />;
}
