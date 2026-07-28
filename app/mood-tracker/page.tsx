"use client";

import { useState, useEffect } from "react";
import { addMood, getMoods } from "@/services/moodService";

const moods = ["Happy", "Calm", "Neutral", "Anxious", "Sad"];

interface MoodLog {
  _id: string;
  moodType: string;
  note?: string;
  date: string;
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [savedLogs, setSavedLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await getMoods();
      setSavedLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedMood) return;

    setLoading(true);
    try {
      await addMood({ moodType: selectedMood, note });
      setSelectedMood("");
      setNote("");
      fetchMoods();
    } catch (error) {
      console.error("Failed to save mood:", error);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="bg-zinc-900 text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Mood"}
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Your Logs</h2>
        {savedLogs.length === 0 ? (
          <p className="text-zinc-500">No logs yet.</p>
        ) : (
          <ul className="space-y-2">
            {savedLogs.map((log) => (
              <li key={log._id} className="border border-zinc-200 rounded-lg p-3">
                <span className="font-medium">{log.moodType}</span>
                {log.note && <span className="text-zinc-600"> — {log.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}