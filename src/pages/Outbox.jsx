import React, { useEffect, useMemo, useState } from "react";
import { useApi } from "../context/ApiContext";

function formatDate(iso) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function StatusPill({ value }) {
  const map = {
    PENDING: "bg-amber-50 text-amber-800 border-amber-200",
    SENT: "bg-emerald-50 text-emerald-800 border-emerald-200",
    FAILED: "bg-red-50 text-red-800 border-red-200",
  };
  const cls = map[value] || "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-extrabold ${cls}`}>
      {value}
    </span>
  );
}

function humanEventType(eventType) {
  const dict = {
    "justice.request.created": "Demande créée",
    "justice.request.status_updated": "Statut mis à jour",
  };
  return dict[eventType] || eventType;
}

export default function Outbox() {
  const { listOutbox } = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listOutbox();
      setItems(Array.isArray(res) ? res : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const data = useMemo(() => items.slice().reverse(), [items]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-3xl border border-mainblue/15 bg-white shadow p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-2xl font-extrabold text-mainblue">Historique des actions</div>
            <div className="text-slate-600 mt-1 text-sm">
              Suivi interne des événements (création de demande, mise à jour de statut, etc.)
            </div>
          </div>

          <button
            onClick={load}
            disabled={loading}
            className="rounded-2xl border border-mainblue/20 text-mainblue font-extrabold py-2 px-4 hover:bg-mainblue/5 disabled:opacity-60"
          >
            {loading ? "Actualisation..." : "Rafraîchir"}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-3xl border border-mainblue/15 bg-white shadow p-6">
        {data.length === 0 ? (
          <div className="text-slate-600">Aucun événement pour le moment.</div>
        ) : (
          <div className="space-y-4">
            {data.map((e) => {
              const requestId = e?.payload?.request_id ?? "-";
              const nin = e?.payload?.citizen_nin ?? "-";
              const status = e?.status ?? "PENDING";

              const isExpanded = expandedId === e.id;

              return (
                <div key={e.id} className="flex gap-4">
                  {/* Dot */}
                  <div className="pt-2">
                    <div className="w-3 h-3 rounded-full bg-mainblue" />
                    <div className="w-[2px] h-full bg-mainblue/10 mx-auto mt-2" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-mainblue/15 bg-soft p-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="font-extrabold text-mainblue truncate">
                          {humanEventType(e.event_type)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {formatDate(e.created_at)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusPill value={status} />
                        <span className="px-3 py-1 rounded-full border border-mainblue/15 bg-white text-mainblue text-xs font-extrabold">
                          Event #{e.id}
                        </span>
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="mt-3 grid sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-mainblue/10 bg-white p-3">
                        <div className="text-xs text-slate-500">Demande</div>
                        <div className="font-extrabold text-mainblue">#{requestId}</div>
                      </div>
                      <div className="rounded-xl border border-mainblue/10 bg-white p-3">
                        <div className="text-xs text-slate-500">NIN</div>
                        <div className="font-extrabold text-mainblue">{nin}</div>
                      </div>
                      <div className="rounded-xl border border-mainblue/10 bg-white p-3">
                        <div className="text-xs text-slate-500">Envoi</div>
                        <div className="font-extrabold text-mainblue">
                          {e.sent_at ? "Envoyé" : "En attente"}
                        </div>
                      </div>
                    </div>

                    {/* Error message */}
                    {e.error_message ? (
                      <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                        <b>Erreur:</b> {e.error_message}
                      </div>
                    ) : null}

                    {/* Details toggle */}
                    <div className="mt-3">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : e.id)}
                        className="text-mainblue font-extrabold text-sm hover:underline"
                      >
                        {isExpanded ? "Masquer détails" : "Afficher détails"}
                      </button>

                      {isExpanded ? (
                        <pre className="mt-2 bg-white rounded-xl border border-mainblue/15 p-3 overflow-auto text-sm">
{JSON.stringify(e.payload, null, 2)}
                        </pre>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hint */}
  
    </div>
  );
}
