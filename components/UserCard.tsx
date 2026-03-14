"use client";

import Link from "next/link";
import { User } from "@/types";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-5 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 max-sm:flex-wrap">
      <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-[1.2rem] font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="m-0 mb-1 text-base font-semibold text-gray-900">
          {user.name}
        </h2>
        <p className="m-0 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-medium text-gray-700">Email:</span> {user.email}
        </p>
        <p className="m-0 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-medium text-gray-700">Company:</span>{" "}
          {user.company.name}
        </p>
      </div>
      <Link
        href={`/users/${user.id}`}
        className="shrink-0 inline-block py-2 px-4 bg-indigo-500 text-white rounded-lg no-underline text-sm font-medium transition-all hover:bg-indigo-600 hover:scale-[1.03] whitespace-nowrap max-sm:w-full max-sm:text-center"
      >
        View Posts →
      </Link>
    </div>
  );
}
