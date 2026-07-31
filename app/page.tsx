"use client";

import Link from "next/link";
import { Heart, BookOpen, BarChart3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-teal-50 px-4">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-10 h-10 text-teal-600" fill="currentColor" />
      </div>
      <h1 className="text-5xl font-bold text-zinc-900 mb-4 text-center">
        Welcome to MoodMate
      </h1>
      <p className="text-lg text-zinc-600 max-w-md text-center mb-10">
        Track your moods, write journal entries, and understand your emotional wellness journey.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
          <Heart className="w-7 h-7 text-teal-600 mx-auto mb-2" />
          <p className="font-medium text-sm">Mood Tracking</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
          <BookOpen className="w-7 h-7 text-teal-600 mx-auto mb-2" />
          <p className="font-medium text-sm">Journaling</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
          <BarChart3 className="w-7 h-7 text-teal-600 mx-auto mb-2" />
          <p className="font-medium text-sm">Wellness Insights</p>
        </div>
      </div>

      <Link
        href={user ? "/dashboard" : "/auth/register"}
        className="mt-10 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
      >
        {user ? "Go to Dashboard" : "Get Started"}
      </Link>
    </div>
  );
}