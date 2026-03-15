"use client";

import { usePostsStore } from "@/store/postStore";

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
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all active:scale-95"
        aria-label="Previous page"
      >
        <span>←</span> Prev
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all active:scale-90 ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all active:scale-95"
        aria-label="Next page"
      >
        Next <span>→</span>
      </button>
    </nav>
  );
}
