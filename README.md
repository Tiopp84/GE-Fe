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
