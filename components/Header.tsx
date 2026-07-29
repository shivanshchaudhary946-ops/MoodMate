"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="w-full border-b border-zinc-200 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-zinc-900">
          MoodMate
        </Link>

        <div className="flex gap-6 text-sm font-medium text-zinc-600 items-center">
          <Link href="/">Home</Link>
          <Link href="/mood-tracker">Mood Tracker</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/dashboard">Dashboard</Link>

          {user ? (
            <>
              <span className="text-zinc-900">{user.name}</span>
              <button onClick={handleLogout} className="text-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="text-zinc-900 font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}