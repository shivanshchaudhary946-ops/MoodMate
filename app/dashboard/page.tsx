"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleMoodData = [
  { day: "Mon", happy: 2, sad: 0, calm: 1 },
  { day: "Tue", happy: 1, sad: 1, calm: 0 },
  { day: "Wed", happy: 3, sad: 0, calm: 1 },
  { day: "Thu", happy: 0, sad: 2, calm: 1 },
  { day: "Fri", happy: 2, sad: 0, calm: 2 },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Wellness Dashboard</h1>

      <div className="border border-zinc-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Mood Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleMoodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="happy" fill="#FFD700" />
            <Bar dataKey="sad" fill="#4169E1" />
            <Bar dataKey="calm" fill="#87CEEB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}