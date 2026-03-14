"use client";

import { create } from "zustand";
import { Post } from "@/types";

const POSTS_PER_PAGE = 5;
const LOCAL_STORAGE_KEY = "local_posts";

function getLocalPosts(userId: number): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPosts(userId: number, posts: Post[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_${userId}`,
      JSON.stringify(posts),
    );
  } catch {
    // silently fail localStorage errors
  }
}

interface PostsState {
  posts: Post[];
  currentPage: number;
  postsPerPage: number;
  setPosts: (posts: Post[], userId?: number) => void;
  addPost: (post: Omit<Post, "id">, userId: number) => void;
  setCurrentPage: (page: number) => void;
  getTotalPages: () => number;
  getCurrentPagePosts: () => Post[];
}

export const usePostsStore = create<PostsState>(
  (
    set: (arg0: { posts?: any[]; currentPage: number }) => void,
    get: () => { posts: any; postsPerPage?: any; currentPage?: any },
  ) => ({
    posts: [],
    currentPage: 1,
    postsPerPage: POSTS_PER_PAGE,

    setPosts: (posts: Post[], userId?: number) => {
      const localPosts = userId ? getLocalPosts(userId) : [];
      // Merge local posts on top, avoid duplicates by id
      const localIds = new Set(localPosts.map((p) => p.id));
      const merged = [
        ...localPosts,
        ...posts.filter((p) => !localIds.has(p.id)),
      ];
      set({ posts: merged, currentPage: 1 });
    },

    addPost: (postData: Omit<Post, "id">, userId: number) => {
      const { posts } = get();
      const newPost: Post = {
        ...postData,
        id: Date.now(), // unique local id
        isLocal: true,
      };
      const updatedPosts = [newPost, ...posts];
      set({ posts: updatedPosts, currentPage: 1 });

      // Persist only local posts to localStorage
      const localPosts = updatedPosts.filter((p) => p.isLocal);
      saveLocalPosts(userId, localPosts);
    },

    setCurrentPage: (page: number) => set({ currentPage: page }),

    getTotalPages: () => {
      const { posts, postsPerPage } = get();
      return Math.ceil(posts.length / postsPerPage);
    },

    getCurrentPagePosts: () => {
      const { posts, currentPage, postsPerPage } = get();
      const start = (currentPage - 1) * postsPerPage;
      return posts.slice(start, start + postsPerPage);
    },
  }),
);
