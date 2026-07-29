"use client";

import { useState, useEffect } from "react";
import { addMood, getMoods } from "@/services/moodService";
import { Smile, Wind, Meh, AlertCircle, Frown } from "lucide-react";

const moods = [
  { label: "Happy", icon: Smile, color: "border-yellow-400 bg-yellow-50 text-yellow-700" },
  { label: "Calm", icon: Wind, color: "border-sky-400 bg-sky-50 text-sky-700" },
  { label: "Neutral", icon: Meh, color: "border-zinc-400 bg-zinc-50 text-zinc-700" },
  { label: "Anxious", icon: AlertCircle, color: "border-orange-400 bg-orange-50 text-orange-700" },
  { label: "Sad", icon: Frown, color: "border-blue-400 bg-blue-50 text-blue-700" },
];

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
      <h1 className="text-2xl font-bold mb-1">How are you feeling today?</h1>
      <p className="text-zinc-500 mb-6 text-sm">Pick a mood and add a quick note if you like.</p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {moods.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(label)}
            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all ${
              selectedMood === label ? color : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note about how you're feeling..."
        className="w-full border border-zinc-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        rows={3}
      />

      <button
        onClick={handleSave}
        disabled={loading || !selectedMood}
        className="bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Saving..." : "Save Mood"}
      </button>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Your Logs</h2>
        {savedLogs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No logs yet. Save your first mood above!</p>
        ) : (
          <ul className="space-y-2">
            {savedLogs.slice().reverse().map((log) => {
              const moodInfo = moods.find((m) => m.label === log.moodType);
              const Icon = moodInfo?.icon || Meh;
              return (
                <li
                  key={log._id}
                  className="flex items-start gap-3 border border-zinc-200 rounded-xl p-3 bg-white"
                >
                  <Icon className="w-5 h-5 mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{log.moodType}</span>
                    {log.note && <p className="text-zinc-600 text-sm mt-0.5">{log.note}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}