import React from "react";
import { useApp } from "../context/AppContext";

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="fixed right-4 bottom-4 z-50 space-y-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-80 rounded-xl border border-mainblue/15 bg-white shadow-lg p-3"
        >
          <div className="font-extrabold text-mainblue">{t.type.toUpperCase()}</div>
          <div className="text-sm text-slate-600 mt-1">{t.message}</div>
        </div>
      ))}
    </div>
  );
}
