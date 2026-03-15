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
    <div className="space-y-10">
      {/* User Info Banner */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 flex items-center justify-between gap-6 shadow-sm group hover:border-blue-100 transition-all">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-100 transform -rotate-3 group-hover:rotate-0 transition-transform">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
              {user.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                {user.email}
              </span>
              <span className="text-gray-400 font-medium text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                {user.company.name}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="px-6 py-3 border-2 border-gray-100 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center gap-2 group/btn"
        >
          <span className="group-hover/btn:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Directory
        </Link>
      </div>

      {/* Posts + Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        <section className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Recent Activity
            </h2>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
              {posts.length} Posts Available
            </span>
          </div>
          <PostList initialPosts={posts} userId={userId} />
        </section>
        <aside className="sticky top-24">
          <AddPostForm userId={userId} />
        </aside>
      </div>
    </div>
  );
}

export default async function UserPostsPage({ params }: PageProps) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (isNaN(userId)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[400px] text-center">
        <span className="text-5xl">🚫</span>
        <p className="text-red-500 text-xl font-bold">Invalid user ID.</p>
        <Link href="/" className="text-blue-600 font-bold hover:underline mt-2">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-6 min-h-[400px] text-center">
          <div className="w-16 h-16 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin shadow-inner" />
          <div className="space-y-2">
            <p className="text-gray-900 text-xl font-black tracking-tight">
              Curating your feed...
            </p>
            <p className="text-gray-400 text-sm font-medium">
              Fetching the latest posts just for you
            </p>
          </div>
        </div>
      }
    >
      <UserPostsContent userId={userId} />
    </Suspense>
  );
}
