"use client";

import { useEffect } from "react";
import { Post } from "@/types";
import { usePostsStore } from "@/store/postStore";
import PostCard from "./PostCard";
import Pagination from "./Pagination";

interface Props {
  initialPosts: Post[];
  userId: number;
}

export default function PostList({ initialPosts, userId }: Props) {
  const { setPosts, getCurrentPagePosts, posts } = usePostsStore();

  useEffect(() => {
    setPosts(initialPosts, userId);
  }, [initialPosts, userId, setPosts]);

  const currentPosts = getCurrentPagePosts();

  return (
    <div className="">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="m-0 text-xl font-bold text-gray-900">Posts</h2>
        <span className="text-sm text-gray-400">{posts.length} total</span>
      </div>

      {currentPosts.length === 0 ? (
        <p className="text-center text-gray-400 p-8">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
}
