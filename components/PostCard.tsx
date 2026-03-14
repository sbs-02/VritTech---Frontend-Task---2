import { Post } from "@/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl px-6 py-5 relative transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)] ${post.isLocal ? "border-l-4 border-l-indigo-500 bg-gray-50" : ""}`}
    >
      {post.isLocal && (
        <span className="inline-block text-[0.7rem] font-semibold bg-violet-100 text-violet-700 rounded-full px-2.5 py-0.5 mb-2 uppercase tracking-tight">
          New (Local)
        </span>
      )}
      <h3 className="m-0 mb-2 text-[0.975rem] font-semibold text-gray-800 capitalize">
        {post.title}
      </h3>
      <p className="m-0 text-sm text-gray-500 leading-relaxed">{post.body}</p>
    </div>
  );
}
