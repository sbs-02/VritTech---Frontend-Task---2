"use client";

import { useUsersStore } from "@/store/userStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useUsersStore();

  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-12 py-4 bg-white border border-gray-100 rounded-2xl text-gray-900 text-base font-medium placeholder-gray-400 outline-none transition-all shadow-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-blue-600 transition-colors">
        🔍
      </span>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-200 transition-colors"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
