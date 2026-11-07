const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Language FE
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
          Frontend scaffold
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Next.js frontend đã sẵn sàng. UI học tập và admin sẽ được xây dựng trên
          nền tảng này; dữ liệu lấy từ Express API.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Backend API
        </p>
        <p className="mt-2 font-mono text-sm text-slate-800">{apiUrl}</p>
        <a
          className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline"
          href={`${apiUrl}/health`}
          target="_blank"
          rel="noreferrer"
        >
          Kiểm tra /health
        </a>
      </div>

      <p className="text-xs text-slate-500">
        Tài liệu kiến trúc và kế hoạch triển khai nằm trong thư mục{" "}
        <code className="rounded bg-slate-200 px-1 py-0.5">docs/</code> ở workspace
        root.
      </p>
    </main>
  );
}
