"use client";

import { useState, useEffect } from "react";
import {
  createJournal,
  getJournals,
  deleteJournal,
} from "@/services/journalService";

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
        disabled={loading}
        className="bg-zinc-900 text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Your Entries</h2>
        {entries.length === 0 ? (
          <p className="text-zinc-500">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li
                key={entry._id}
                className="border border-zinc-200 rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">{entry.title}</h3>
                  <p className="text-zinc-600 text-sm mt-1">{entry.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-red-600 text-sm ml-3"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}