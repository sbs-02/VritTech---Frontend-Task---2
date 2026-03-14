"use client";

import { usePostsStore } from "@/store/postsStore";

export default function Pagination() {
  const { currentPage, setCurrentPage, getTotalPages } = usePostsStore();
  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-6 flex-wrap"
      aria-label="Post pagination"
    >
      <button
        className="py-1.5 px-3.5 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium transition-colors hover:enabled:bg-gray-100 hover:enabled:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            className={`w-9 h-9 border rounded-lg text-sm font-medium transition-colors shadow-sm ${
              page === currentPage
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
            }`}
            onClick={() => setCurrentPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="py-1.5 px-3.5 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium transition-colors hover:enabled:bg-gray-100 hover:enabled:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
