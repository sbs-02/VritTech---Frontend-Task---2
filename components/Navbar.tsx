import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-[960px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold text-gray-900 no-underline"
        >
          <span className="text-[1.2rem]">📋</span>
          User &amp; Posts Dashboard
        </Link>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-[0.9rem] font-medium text-gray-500 py-1 px-2.5 rounded-md transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Users
          </Link>
        </div>
      </nav>
    </header>
  );
}
