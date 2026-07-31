import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-teal-100 bg-gradient-to-b from-teal-50/50 to-teal-50 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-lg mb-2">
              <Heart className="w-5 h-5" fill="currentColor" />
              MoodMate
            </div>
            <p className="text-sm text-zinc-600">
              Your personal companion for mood tracking, journaling, and mental wellness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 mb-3 text-sm">Features</h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/mood-tracker" className="hover:text-teal-700 transition-colors">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-teal-700 transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-teal-700 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 rounded-xl p-4 border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2 text-sm">Wellness Tip</h4>
            <p className="text-sm text-zinc-600 italic">
              "Taking a moment to check in with yourself is an act of self-care."
            </p>
          </div>
        </div>

        <div className="border-t border-teal-200/60 mt-8 pt-6 text-center text-xs text-zinc-500">
          &copy; {currentYear} MoodMate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}