import { Suspense } from "react";
import { fetchUserById, fetchPostsByUser } from "@/lib/api";
import PostList from "@/components/PostList";
import AddPostForm from "@/components/AddPostForm";
import Link from "next/link";
import { Post } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function UserPostsContent({ userId }: { userId: number }) {
  let user = null;
  let posts: Post[] = [];
  let errorMsg = "";

  // apiIsLoading is implicitly handled by SSR + Suspense —
  // the loading.tsx fallback prevents content flash.
  try {
    [user, posts] = await Promise.all([
      fetchUserById(userId),
      fetchPostsByUser(userId),
    ]);
  } catch {
    errorMsg = "Something went wrong";
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
        <p className="text-red-500 text-base font-medium">⚠ {errorMsg}</p>
        <p className="text-[0.875rem] text-gray-400">
          Unable to load user data. Please try again.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
        <p className="text-red-500 text-base font-medium">User not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* User Info Banner */}
      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-5 mb-7 max-md:flex-wrap">
        <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-[1.4rem] font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="m-0 mb-1 text-[1.2rem] font-bold text-gray-900">
            {user.name}
          </h1>
          <p className="m-0 text-sm text-gray-500">
            {user.email} · {user.company.name}
          </p>
        </div>
        <Link
          href="/"
          className="shrink-0 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 no-underline text-sm font-medium transition-colors shadow-sm hover:bg-gray-100 max-md:w-full max-md:text-center"
        >
          ← Back to Users
        </Link>
      </div>

      {/* Posts + Form Grid */}
      <div className="grid grid-cols-[1fr_340px] gap-6 items-start max-md:grid-cols-1">
        <section className="">
          <PostList initialPosts={posts} userId={userId} />
        </section>
        <aside className="">
          <AddPostForm userId={userId} />
        </aside>
      </div>
    </>
  );
}

export default async function UserPostsPage({ params }: PageProps) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
        <p className="text-red-500 text-base font-medium">Invalid user ID.</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-base font-medium">
            Loading users...
          </p>
        </div>
      }
    >
      <UserPostsContent userId={userId} />
    </Suspense>
  );
}
