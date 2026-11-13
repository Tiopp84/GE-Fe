"use client";

import { PageError, PageLoading } from "@/components/data-state";
import { useCatalog } from "@/lib/use-content";
import DashboardView from "./dashboard-view";

export default function DashboardPage() {
  const catalog = useCatalog();

  if (catalog.loading) return <PageLoading label="Đang tải bài học…" />;
  if (catalog.error) return <PageError message={catalog.error} />;
  if (!catalog.data) return null;

  return <DashboardView lessons={catalog.data.lessons} />;
}
