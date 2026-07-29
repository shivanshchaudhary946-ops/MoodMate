"use client";

import { useState, useEffect } from "react";
import { createJournal, getJournals, deleteJournal } from "@/services/journalService";
import { Trash2, BookOpen } from "lucide-react";

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await getJournals();
      setEntries(res.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      await createJournal({ title, content });
      setTitle("");
      setContent("");
      fetchEntries();
    } catch (error) {
      console.error("Failed to save journal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJournal(id);
      fetchEntries();
    } catch (error) {
      console.error("Failed to delete journal:", error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Journal</h1>
      <p className="text-zinc-500 mb-6 text-sm">Write down your thoughts and reflections.</p>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="w-full border border-zinc-300 rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full border border-zinc-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        rows={5}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Your Entries</h2>
        {entries.length === 0 ? (
          <p className="text-zinc-500 text-sm">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {entries.slice().reverse().map((entry) => (
              <li
                key={entry._id}
                className="border border-zinc-200 rounded-xl p-4 bg-white flex justify-between items-start gap-3"
              >
                <div className="flex gap-3">
                  <BookOpen className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">{entry.title}</h3>
                    <p className="text-zinc-600 text-sm mt-1">{entry.content}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-zinc-400 hover:text-red-600 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}