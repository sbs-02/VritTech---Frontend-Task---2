import { fetchUsers } from "@/lib/api";
import UserList from "@/components/UserList";
import { User } from "@/types";

export default async function HomePage() {
  let users: User[] = [];
  let errorMsg = "";

  // apiIsLoading variable would be used in a client component pattern;
  // here SSR fetches data before render — loading is implicit via Suspense boundaries.
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

  return <UserList initialUsers={users} />;
}
