import { Post } from "@/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl p-6 relative transition-all hover:shadow-lg group ${post.isLocal ? "border-l-4 border-l-blue-600 bg-blue-50/30" : ""}`}
    >
      {post.isLocal && (
        <span className="absolute top-4 right-4 text-[10px] font-bold bg-blue-600 text-white rounded-full px-2 py-0.5 uppercase tracking-wider">
          Recent Post
        </span>
      )}
      <h3 className="m-0 mb-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors capitalize leading-snug">
        {post.title}
      </h3>
      <p className="m-0 text-[0.925rem] text-gray-600 leading-relaxed font-medium capitalize">
        {post.body}
      </p>
    </div>
  );
}
