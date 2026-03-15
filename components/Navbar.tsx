import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl">📋</span>
          <span>SocialDesk</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
          >
            Users
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95">
            Dashboard
          </button>
        </div>
      </nav>
    </header>
  );
}
