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
        <main className="max-w-[960px] mx-auto py-8 px-6">{children}</main>
      </body>
    </html>
  );
}
