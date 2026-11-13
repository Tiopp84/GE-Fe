"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { ProgressProvider } from "@/lib/progress";
import { SettingsProvider } from "@/lib/settings";
import { ToastProvider } from "@/components/ui";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ProgressProvider>
          <ToastProvider>{children}</ToastProvider>
        </ProgressProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
