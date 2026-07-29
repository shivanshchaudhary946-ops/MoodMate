"use client";

import { useState, useEffect, useMemo } from "react";
import { getMoods } from "@/services/moodService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heart, TrendingUp } from "lucide-react";

interface Mood {
  moodType: string;
  date: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Dashboard() {
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await getMoods();
      setMoods(res.data);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    }
  };

  const weeklyMoodData = useMemo(() => {
    const base = DAYS.map((day) => ({
      day,
      Happy: 0,
      Calm: 0,
      Neutral: 0,
      Anxious: 0,
      Sad: 0,
    }));

    moods.forEach((mood) => {
      const dayIndex = new Date(mood.date).getDay();
      const dayName = DAYS[dayIndex];
      const record = base.find((d) => d.day === dayName);
      if (record && mood.moodType in record) {
        (record as any)[mood.moodType]++;
      }
    });

    return base;
  }, [moods]);

  const mostCommonMood = useMemo(() => {
    if (moods.length === 0) return "—";
    const counts: Record<string, number> = {};
    moods.forEach((m) => (counts[m.moodType] = (counts[m.moodType] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [moods]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Wellness Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <Heart className="w-6 h-6 text-teal-600 mb-2" />
          <p className="text-3xl font-bold">{moods.length}</p>
          <p className="text-sm text-zinc-500">Mood Logs</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <TrendingUp className="w-6 h-6 text-teal-600 mb-2" />
          <p className="text-3xl font-bold">{mostCommonMood}</p>
          <p className="text-sm text-zinc-500">Most Common Mood</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Mood Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyMoodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#71717a" fontSize={12} />
            <Tooltip />
            <Bar dataKey="Happy" fill="#facc15" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Calm" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Neutral" fill="#a1a1aa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Anxious" fill="#fb923c" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Sad" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}