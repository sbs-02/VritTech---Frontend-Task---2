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
    <div className="w-full">
      <div className="mb-10 max-w-2xl">
        <SearchBar />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-24 bg-white border border-dashed border-gray-200 rounded-3xl text-gray-400">
          <p className="text-xl font-bold">
            No explorers found matching &quot;{searchQuery}&quot;
          </p>
          <p className="mt-1 font-medium">Try searching for another name</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
