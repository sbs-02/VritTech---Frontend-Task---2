"use client";

import { useState } from "react";
import { usePostsStore } from "@/store/postStore";
import { postSchema, PostFormData } from "@/lib/validators";
import { createPost } from "@/lib/api";

interface Props {
  userId: number;
}

export default function AddPostForm({ userId }: Props) {
  const { addPost } = usePostsStore();

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState<Partial<PostFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof PostFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    // Zod validation
    const result = postSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<PostFormData> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof PostFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Call API (mocked — JSONPlaceholder returns a fake id)
      await createPost(formData, userId);

      // Add to local store + localStorage
      addPost({ ...formData, userId }, userId);

      setFormData({ title: "", body: "" });
      setErrors({});
      setSuccessMsg("Post added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrors({ title: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    "px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 bg-gray-50/50 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-blue-100";
  const inputNormalClasses = "border-gray-200 focus:border-blue-600";
  const inputErrorClasses =
    "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
          ✍️
        </div>
        <div>
          <h2 className="m-0 text-xl font-bold text-gray-900 leading-none">
            Share Something
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create a new post for your feed
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <div className="space-y-2">
          <label
            htmlFor="post-title"
            className="text-sm font-bold text-gray-700 ml-1"
          >
            Catchy Title
          </label>
          <input
            id="post-title"
            name="title"
            type="text"
            placeholder="What's on your mind?"
            value={formData.title}
            onChange={handleChange}
            className={`${inputBaseClasses} ${errors.title ? inputErrorClasses : inputNormalClasses} w-full`}
            disabled={isSubmitting}
          />
          {errors.title && (
            <span className="text-xs text-red-500 font-bold ml-1" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="post-body"
            className="text-sm font-bold text-gray-700 ml-1"
          >
            Post Content
          </label>
          <textarea
            id="post-body"
            name="body"
            placeholder="Tell us more about it..."
            value={formData.body}
            onChange={handleChange}
            rows={4}
            className={`${inputBaseClasses} ${errors.body ? inputErrorClasses : inputNormalClasses} w-full`}
            disabled={isSubmitting}
          />
          {errors.body && (
            <span className="text-xs text-red-500 font-bold ml-1" role="alert">
              {errors.body}
            </span>
          )}
        </div>

        {successMsg && (
          <div
            className="text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-xl py-4 px-4 font-bold animate-in fade-in slide-in-from-top-2"
            role="status"
          >
            ✨ {successMsg}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-6 bg-blue-600 text-white rounded-xl text-base font-bold transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post to Feed"}
        </button>
      </form>
    </div>
  );
}
