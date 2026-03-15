export default function UserPostsLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[200px] text-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-500 text-base font-medium">Fetching posts...</p>
    </div>
  );
}
