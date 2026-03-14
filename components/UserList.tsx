"use client";

import { useEffect } from "react";
import { User } from "@/types";
import { useUsersStore } from "@/store/userStore";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";

interface Props {
  initialUsers: User[];
}

export default function UserList({ initialUsers }: Props) {
  const { setUsers, getFilteredUsers, searchQuery } = useUsersStore();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  const filteredUsers = getFilteredUsers();

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-baseline gap-4 mb-4">
        <h1 className="text-[1.6rem] font-bold text-gray-900 m-0">
          Users Directory
        </h1>
        <p className="text-sm text-gray-400 m-0">
          {filteredUsers.length} of {initialUsers.length} users
        </p>
      </div>
      <div className="mb-6">
        <SearchBar />
      </div>
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 px-4 text-gray-400 text-[0.95rem]">
          <p>No users match &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
