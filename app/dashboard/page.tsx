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

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Your Wellness Dashboard</h1>
      <p className="text-zinc-600 mb-6">Total mood logs: {moods.length}</p>

      <div className="border border-zinc-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Mood Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyMoodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Happy" fill="#FFD700" />
            <Bar dataKey="Calm" fill="#87CEEB" />
            <Bar dataKey="Neutral" fill="#D3D3D3" />
            <Bar dataKey="Anxious" fill="#FF6B6B" />
            <Bar dataKey="Sad" fill="#4169E1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}