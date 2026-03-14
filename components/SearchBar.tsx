"use client";

import { useUsersStore } from "@/store/userStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useUsersStore();

  return (
    <div className="relative w-full max-w-[480px]">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-[0.95rem] outline-none bg-white text-gray-900 transition-colors shadow-sm focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
        aria-label="Search users"
      />
      {searchQuery && (
        <button
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 text-[0.85rem] p-1 leading-none hover:text-gray-600"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
