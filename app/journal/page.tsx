"use client";

import { useState } from "react";

interface JournalEntry {
  title: string;
  content: string;
}

export default function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    setEntries([...entries, { title, content }]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Journal</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="w-full border border-zinc-300 rounded-lg p-3 mb-3"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full border border-zinc-300 rounded-lg p-3 mb-4"
        rows={5}
      />

      <button
        onClick={handleSave}
        className="bg-zinc-900 text-white px-5 py-2 rounded-lg"
      >
        Save Entry
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Your Entries</h2>
        {entries.length === 0 ? (
          <p className="text-zinc-500">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry, i) => (
              <li key={i} className="border border-zinc-200 rounded-lg p-3">
                <h3 className="font-medium">{entry.title}</h3>
                <p className="text-zinc-600 text-sm mt-1">{entry.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}