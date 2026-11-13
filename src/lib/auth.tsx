"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError, apiFetch } from "@/lib/api";
import type {
  AuthResponse,
  AuthSession,
  AuthUser,
  RegisterResponse,
} from "@/lib/api-types";

const STORAGE_KEY = "language-web:auth:v1";

type AuthStatus = "loading" | "anonymous" | "authenticated";

interface StoredAuth {
  user: AuthUser;
  session: AuthSession;
}

interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  session: AuthSession | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
  authFetch: <T>(path: string, init?: RequestInit) => Promise<T>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): StoredAuth | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const data = parsed as Partial<StoredAuth>;
    if (
      !data.user ||
      typeof data.user.id !== "string" ||
      !data.session ||
      typeof data.session.accessToken !== "string" ||
      typeof data.session.refreshToken !== "string"
    ) {
      return null;
    }

    return { user: data.user, session: data.session };
  } catch {
    return null;
  }
}

function writeStoredAuth(data: StoredAuth) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Token vẫn dùng được trong phiên hiện tại; chỉ mất khả năng khôi phục sau reload.
  }
}

function clearStoredAuth() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Không chặn logout nếu localStorage bị khóa.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);

  const applyAuth = useCallback((data: AuthResponse) => {
    setUser(data.user);
    setSession(data.session);
    setStatus("authenticated");
    writeStoredAuth({ user: data.user, session: data.session });
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setSession(null);
    setStatus("anonymous");
    clearStoredAuth();
  }, []);

  const refreshWithToken = useCallback(
    async (refreshToken: string) => {
      try {
        const data = await apiFetch<AuthResponse>("/v1/auth/refresh", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
        applyAuth(data);
        return true;
      } catch (error) {
        if (
          error instanceof ApiError &&
          (error.status === 400 || error.status === 401 || error.status === 403)
        ) {
          clearAuth();
        }
        return false;
      }
    },
    [applyAuth, clearAuth],
  );

  const refresh = useCallback(async () => {
    if (!session?.refreshToken) return false;
    return refreshWithToken(session.refreshToken);
  }, [session, refreshWithToken]);

  useEffect(() => {
    const stored = readStoredAuth();

    if (!stored) {
      setStatus("anonymous");
      return;
    }

    const expiresAt = stored.session.expiresAt
      ? Date.parse(stored.session.expiresAt)
      : Number.NaN;

    if (Number.isFinite(expiresAt) && expiresAt <= Date.now() + 60_000) {
      setUser(stored.user);
      setSession(stored.session);
      setStatus("authenticated");
      void refreshWithToken(stored.session.refreshToken).then((ok) => {
        if (!ok) clearAuth();
      });
      return;
    }

    applyAuth({ user: stored.user, session: stored.session });
  }, [applyAuth, clearAuth, refreshWithToken]);

  useEffect(() => {
    if (!session?.expiresAt) return;

    const expiresAt = Date.parse(session.expiresAt);
    if (!Number.isFinite(expiresAt)) return;

    const delay = Math.max(0, expiresAt - Date.now() - 60_000);
    const timer = window.setTimeout(() => {
      void refresh();
    }, delay);

    return () => window.clearTimeout(timer);
  }, [session, refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await apiFetch<AuthResponse>("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      applyAuth(data);
      return data.user;
    },
    [applyAuth],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const data = await apiFetch<RegisterResponse>("/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.session) {
        applyAuth({ user: data.user, session: data.session });
      }

      return data;
    },
    [applyAuth],
  );

  const logout = useCallback(async () => {
    try {
      if (session?.accessToken) {
        await apiFetch<null>("/v1/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
      }
    } catch {
      // Dù API lỗi, client vẫn phải xóa token local.
    } finally {
      clearAuth();
    }
  }, [session, clearAuth]);

  const authFetch = useCallback(
    async <T,>(path: string, init: RequestInit = {}): Promise<T> => {
      if (!session?.accessToken) {
        throw new ApiError("Bạn cần đăng nhập.", 401, "unauthorized");
      }

      const headers = new Headers(init.headers);
      headers.set("Authorization", `Bearer ${session.accessToken}`);

      try {
        return await apiFetch<T>(path, { ...init, headers });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearAuth();
        }
        throw error;
      }
    },
    [session, clearAuth],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      session,
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
      refresh,
      authFetch,
    }),
    [status, user, session, login, register, logout, refresh, authFetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
