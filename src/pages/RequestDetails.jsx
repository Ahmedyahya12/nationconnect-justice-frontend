import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { useApp } from "../context/AppContext";

export default function RequestDetails({ id }) {
  const { getRequestById, updateStatus } = useApi();
  const { pushToast } = useApp();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getRequestById(id);
      setData(res);
      setStatus(res.status);
    } catch {
      pushToast("error", "Impossible de charger la demande");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const save = async () => {
    try {
      const res = await updateStatus(id, status);
      setData(res);
      pushToast("success", `Statut mis à jour: ${res.status}`);
    } catch {
      pushToast("error", "Erreur update status");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-xl font-extrabold text-mainblue">Détails demande #{id}</div>
        <div className="text-slate-600 mt-1">GET /api/requests/{id}/</div>

        {loading || !data ? (
          <div className="text-slate-600 mt-4">Chargement...</div>
        ) : (
          <div className="mt-4 space-y-2">
            <div><b>NIN:</b> {data.citizen_nin}</div>
            <div><b>Nom:</b> {data.full_name}</div>
            <div><b>Motif:</b> {data.reason || "-"}</div>
            <div className="inline-flex px-3 py-1 rounded-full bg-mainblue/5 border border-mainblue/15 text-mainblue font-extrabold">
              {data.status}
            </div>
            <button
              onClick={load}
              className="mt-4 w-full rounded-xl border border-mainblue/20 text-mainblue font-extrabold py-3 hover:bg-mainblue/5"
            >
              Rafraîchir
            </button>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-xl font-extrabold text-mainblue">Mettre à jour statut</div>
        <div className="text-slate-600 mt-1">PATCH /api/requests/{id}/status/</div>

        <div className="mt-4 space-y-3">
          <label className="font-bold text-mainblue">Statut</label>
          <select
            className="w-full rounded-xl border border-mainblue/15 p-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <button
            onClick={save}
            className="w-full rounded-xl bg-gradient-to-br from-mainblue to-accent text-white font-extrabold py-3"
          >
            Enregistrer
          </button>

          <div className="text-sm text-slate-600">
            ⚠️ Cette action déclenche un événement Outbox (Sprint 3).
          </div>
        </div>
      </div>
    </div>
  );
}
