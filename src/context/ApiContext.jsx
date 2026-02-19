import React, { createContext, useContext } from "react";
import { api } from "../api/axios";

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const createRequest = async (payload) => {
    const res = await api.post("/api/requests/", payload);
    return res.data;
  };

  const getRequestById = async (id) => {
    const res = await api.get(`/api/requests/${id}/`);
    return res.data;
  };

  const updateStatus = async (id, status) => {
    const res = await api.patch(`/api/requests/${id}/status/`, { status });
    return res.data;
  };

  const listOutbox = async () => {
    const res = await api.get("/api/outbox-events/");
    return res.data;
  };

  const askAssistant = async (question, top_k = 3) => {
    const res = await api.post("/api/assistant/ask/", { question, top_k });
    return res.data;
  };

  return (
    <ApiContext.Provider
      value={{ createRequest, getRequestById, updateStatus, listOutbox, askAssistant }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used inside ApiProvider");
  return ctx;
}
