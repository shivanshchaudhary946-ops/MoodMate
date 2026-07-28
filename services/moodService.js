import api from "@/lib/api";

export const addMood = (data) => api.post("/moods", data);

export const getMoods = () => api.get("/moods");