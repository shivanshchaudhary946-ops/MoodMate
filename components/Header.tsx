"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Heart, BarChart3, BookOpen, LogOut, Home } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mood-tracker", label: "Mood Tracker", icon: Heart },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-teal-700">
          <Heart className="w-6 h-6" fill="currentColor" />
          MoodMate
        </Link>

        <div className="flex gap-1 text-sm font-medium text-zinc-600 items-center">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-zinc-200">
              <span className="text-zinc-900 font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="ml-3 px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}