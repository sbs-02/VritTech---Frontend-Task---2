import { User, Post, NewPost } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch user ${id}`);
  }
  return res.json();
}

export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts for user ${userId}`);
  }
  return res.json();
}

export async function createPost(post: NewPost, userId: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...post, userId }),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
}
