import api from "@/lib/api";

export const sendChatMessage = (message) => api.post("/api/chat", { message });