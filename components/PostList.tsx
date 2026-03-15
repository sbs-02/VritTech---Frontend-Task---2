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
    <div className="space-y-8">
      {currentPosts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold">
          No posts in the feed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-gray-100">
        <Pagination />
      </div>
    </div>
  );
}
