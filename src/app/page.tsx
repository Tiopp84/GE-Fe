import type { Metadata } from "next";
import { getCatalog } from "@/lib/api";
import DashboardView from "./dashboard-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trang chủ",
};

export default async function DashboardPage() {
  const catalog = await getCatalog();

  return <DashboardView lessons={catalog.lessons} />;
}
