import type { AuthRole } from "@/lib/api-types";

/**
 * Chỉ chấp nhận đường dẫn nội bộ để tránh open redirect qua `next`.
 * Từ chối `//host`, `/\host` và ký tự điều khiển.
 */
export function safeNextPath(value: string | null | undefined) {
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//") || value.startsWith("/\\")) return null;
  if (/[\u0000-\u001f\u007f]/u.test(value)) return null;

  return value;
}

/** Trang đích sau khi đăng nhập/đăng ký, có phân biệt admin và user thường. */
export function authLandingPath(role: AuthRole, nextPath: string | null) {
  if (role === "admin") return nextPath ?? "/admin";
  if (nextPath && !nextPath.startsWith("/admin")) return nextPath;
  return "/";
}
