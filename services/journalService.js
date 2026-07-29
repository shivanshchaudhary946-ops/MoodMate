import api from "@/lib/api";

export const createJournal = (data) => api.post("/journals", data);

export const getJournals = () => api.get("/journals");

export const updateJournal = (id, data) => api.put(`/journals/${id}`, data);

export const deleteJournal = (id) => api.delete(`/journals/${id}`);