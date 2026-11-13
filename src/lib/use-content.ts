"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import type {
  CatalogResponse,
  ExercisePageData,
  LessonBundle,
} from "@/lib/api-types";

interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApiResource<T>(path: string | null): ResourceState<T> {
  const { status, authFetch } = useAuth();
  const [state, setState] = useState<ResourceState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (status === "loading") {
      setState({ data: null, loading: true, error: null });
      return;
    }

    if (status !== "authenticated" || !path) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    authFetch<T>(path)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Không tải được dữ liệu từ API.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [status, path, authFetch]);

  return state;
}

export function useCatalog() {
  return useApiResource<CatalogResponse>("/v1/catalog");
}

export function useLessonBundle(lessonId: string) {
  return useApiResource<LessonBundle>(
    lessonId ? `/v1/lessons/${encodeURIComponent(lessonId)}` : null,
  );
}

export function useDefaultLessonBundle() {
  const catalog = useCatalog();
  const lessonId = useMemo(
    () => catalog.data?.lessons.find((lesson) => lesson.available)?.id ?? null,
    [catalog.data],
  );
  const bundle = useApiResource<LessonBundle>(
    lessonId ? `/v1/lessons/${encodeURIComponent(lessonId)}` : null,
  );

  return {
    data: bundle.data,
    loading: catalog.loading || bundle.loading,
    error:
      catalog.error ??
      bundle.error ??
      (catalog.data && !lessonId ? "Chưa có bài học nào được publish." : null),
  };
}

export function useExercise(exerciseId: string) {
  return useApiResource<ExercisePageData>(
    exerciseId ? `/v1/exercises/${encodeURIComponent(exerciseId)}` : null,
  );
}
