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
    "px-3.5 py-2.5 border-[1.5px] rounded-lg text-[0.9rem] font-inherit text-gray-900 bg-white outline-none transition-colors resize-y";
  const inputNormalClasses =
    "border-gray-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 shadow-sm";
  const inputErrorClasses =
    "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/15";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="m-0 mb-5 text-[1.1rem] font-bold text-gray-900">
        Add New Post
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="post-title"
            className="text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            id="post-title"
            name="title"
            type="text"
            placeholder="Enter post title..."
            value={formData.title}
            onChange={handleChange}
            className={`${inputBaseClasses} ${errors.title ? inputErrorClasses : inputNormalClasses}`}
            disabled={isSubmitting}
          />
          {errors.title && (
            <span className="text-xs text-red-500 font-medium" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="post-body"
            className="text-sm font-semibold text-gray-700"
          >
            Body
          </label>
          <textarea
            id="post-body"
            name="body"
            placeholder="Write your post content..."
            value={formData.body}
            onChange={handleChange}
            rows={4}
            className={`${inputBaseClasses} ${errors.body ? inputErrorClasses : inputNormalClasses}`}
            disabled={isSubmitting}
          />
          {errors.body && (
            <span className="text-xs text-red-500 font-medium" role="alert">
              {errors.body}
            </span>
          )}
        </div>

        {successMsg && (
          <div
            className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md py-2.5 px-3.5 font-medium"
            role="status"
          >
            ✓ {successMsg}
          </div>
        )}

        <button
          type="submit"
          className="py-2.5 px-6 bg-indigo-500 text-white rounded-lg text-[0.9rem] font-semibold self-start transition-all hover:enabled:bg-indigo-600 active:enabled:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
