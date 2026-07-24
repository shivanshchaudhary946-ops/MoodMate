import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-zinc-900">
          MoodMate
        </Link>

        <div className="flex gap-6 text-sm font-medium text-zinc-600">
          <Link href="/">Home</Link>
          <Link href="/mood-tracker">Mood Tracker</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}