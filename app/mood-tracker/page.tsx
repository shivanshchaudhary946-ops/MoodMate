"use client";

import { useState } from "react";

const moods = ["Happy", "Calm", "Neutral", "Anxious", "Sad"];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [savedLogs, setSavedLogs] = useState<{ mood: string; note: string }[]>([]);

  const handleSave = () => {
    if (!selectedMood) return;

    setSavedLogs([...savedLogs, { mood: selectedMood, note }]);
    setSelectedMood("");
    setNote("");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">How are you feeling today?</h1>

      <div className="flex gap-3 flex-wrap mb-4">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={`px-4 py-2 rounded-lg border ${
              selectedMood === mood
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-700 border-zinc-300"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note about how you're feeling..."
        className="w-full border border-zinc-300 rounded-lg p-3 mb-4"
        rows={3}
      />

      <button
        onClick={handleSave}
        className="bg-zinc-900 text-white px-5 py-2 rounded-lg"
      >
        Save Mood
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Your Logs</h2>
        {savedLogs.length === 0 ? (
          <p className="text-zinc-500">No logs yet.</p>
        ) : (
          <ul className="space-y-2">
            {savedLogs.map((log, i) => (
              <li key={i} className="border border-zinc-200 rounded-lg p-3">
                <span className="font-medium">{log.mood}</span>
                {log.note && <span className="text-zinc-600"> — {log.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}