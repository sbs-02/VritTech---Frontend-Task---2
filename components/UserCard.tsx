"use client";

import Link from "next/link";
import { User } from "@/types";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex items-center gap-5 bg-white border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-xl hover:border-blue-100 group">
      <div className="shrink-0 w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold border-2 border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="m-0 mb-1 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {user.name}
        </h2>
        <div className="flex flex-col gap-0.5">
          <p className="m-0 text-sm text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            {user.email}
          </p>
          <p className="m-0 text-sm text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            {user.company.name}
          </p>
        </div>
      </div>
      <Link
        href={`/users/${user.id}`}
        className="shrink-0 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 whitespace-nowrap"
      >
        Explore Posts
      </Link>
    </div>
  );
}
