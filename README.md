# Language FE

Frontend Next.js của hệ thống học tiếng Đức.

- Framework: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Deploy: Vercel
- Tài liệu chung: xem thư mục `docs/` ở workspace root
- Backend: repo `be/` (Express API)

## Chạy local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mặc định chạy ở `http://localhost:3000`.

## Auth

- `/login`: đăng nhập bằng tài khoản Supabase Auth.
- `/register`: tự đăng ký tài khoản user thường bằng email + mật khẩu.
- Sau khi đăng ký, nếu Supabase bật “Confirm email”, người dùng được hướng dẫn
  kiểm tra email; nếu tắt, ứng dụng đăng nhập ngay.
- Session được giữ trong `localStorage` và gửi tới backend qua
  `Authorization: Bearer <access-token>`.

Cấu hình backend tương ứng ở `be/README.md` và biến `NEXT_PUBLIC_API_URL` trong
`.env.local`.

## Kiểm tra

```bash
npm run lint
npm run typecheck
npm run build
```

## Ghi chú

- FE không truy cập database trực tiếp.
- Mọi nghiệp vụ đi qua API backend.
- File upload lớn sẽ đi thẳng lên Supabase Storage bằng signed URL.
