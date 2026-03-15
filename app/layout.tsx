import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "User & Posts Dashboard",
  description: "Browse users and their posts from JSONPlaceholder API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto py-12 px-4">{children}</main>
      </body>
    </html>
  );
}
