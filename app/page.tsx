import { fetchUsers } from "@/lib/api";
import UserList from "@/components/UserList";
import { User } from "@/types";

export default async function HomePage() {
  let users: User[] = [];
  let errorMsg = "";

  try {
    users = await fetchUsers();
  } catch {
    errorMsg = "Something went wrong";
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
        <p className="text-red-500 text-base font-medium">⚠ {errorMsg}</p>
        <p className="text-[0.875rem] text-gray-400">
          Unable to load users. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Community Directory
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Discover and connect with users in the network
        </p>
      </div>
      <UserList initialUsers={users} />
    </div>
  );
}
