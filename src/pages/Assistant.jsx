import React, { useState } from "react";
import { useApi } from "../context/ApiContext";
import { useApp } from "../context/AppContext";

export default function Assistant() {
  const { askAssistant } = useApi();
  const { pushToast } = useApp();

  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const ask = async () => {
    try {
      setLoading(true);
      const res = await askAssistant(question, topK);
      setResult(res);
    } catch {
      pushToast("error", "Erreur Assistant RAG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-2xl font-extrabold text-mainblue">Assistant RAG</div>
        <div className="text-slate-600 mt-1">POST /api/assistant/ask/</div>

        <div className="mt-4 space-y-3">
          <label className="font-bold text-mainblue">Question</label>
          <textarea
            className="w-full rounded-xl border border-mainblue/15 p-3 min-h-[120px]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex: Quels documents sont nécessaires ? Quel est le délai ?"
          />

          <label className="font-bold text-mainblue">Top K</label>
          <input
            className="w-full rounded-xl border border-mainblue/15 p-3"
            type="number"
            min={1}
            max={5}
            value={topK}
            onChange={(e) => setTopK(Number(e.target.value))}
          />

          <button
            onClick={ask}
            disabled={loading || !question.trim()}
            className="w-full rounded-xl bg-gradient-to-br from-mainblue to-accent text-white font-extrabold py-3 disabled:opacity-60"
          >
            {loading ? "Recherche..." : "Envoyer"}
          </button>

        </div>
      </div>

      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-2xl font-extrabold text-mainblue">Réponse</div>

        {!result ? (
          <div className="text-slate-600 mt-3">Aucune réponse.</div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="whitespace-pre-wrap">{result.answer}</div>

            <div className="font-extrabold text-mainblue">Sources</div>
            {(result.sources || []).map((s) => (
              <div key={s.rank} className="rounded-2xl border border-mainblue/15 bg-mainblue/5 p-4">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <b className="text-mainblue">Source #{s.rank}</b>
                  <span className="px-3 py-1 rounded-full border border-mainblue/15 bg-white text-mainblue font-extrabold">
                    score {s.score}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{s.excerpt}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
