import type {
  CatalogResponse,
  ExercisePageData,
  LessonBundle,
  LessonSummary,
} from "./api-types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers,
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: { message?: string; code?: string } }
    | null;

  if (!response.ok) {
    throw new ApiError(
      payload?.error?.message ?? "Không gọi được API.",
      response.status,
      payload?.error?.code,
    );
  }

  return payload as T;
}

export async function getCatalog(): Promise<CatalogResponse> {
  return apiFetch<CatalogResponse>("/v1/catalog");
}

export async function getLessonBundle(lessonId: string): Promise<LessonBundle> {
  return apiFetch<LessonBundle>(`/v1/lessons/${encodeURIComponent(lessonId)}`);
}

export async function getExercise(exerciseId: string): Promise<ExercisePageData> {
  return apiFetch<ExercisePageData>(`/v1/exercises/${encodeURIComponent(exerciseId)}`);
}

export async function getDefaultLessonId(): Promise<string> {
  const catalog = await getCatalog();
  const lesson = catalog.lessons.find((item) => item.available);

  if (!lesson) {
    throw new ApiError("Chưa có bài học nào được publish.", 404, "no_lesson");
  }

  return lesson.id;
}

export function lessonHref(lesson: LessonSummary) {
  return `/lektion/${lesson.number}`;
}
