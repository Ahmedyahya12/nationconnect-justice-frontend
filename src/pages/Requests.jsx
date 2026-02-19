import React, { useState } from "react";
import { useApi } from "../context/ApiContext";
import { useApp } from "../context/AppContext";

export default function Requests({ onOpenDetails }) {
  const { createRequest } = useApi();
  const { pushToast } = useApp();

  const [citizen_nin, setNin] = useState("");
  const [full_name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await createRequest({ citizen_nin, full_name, reason });
      setCreated(res);
      pushToast("success", `Demande créée (id=${res.id})`);
    } catch (e) {
      const msg = e?.response?.data?.detail || "Erreur lors de la création (NIN invalid ?)";
      pushToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-xl font-extrabold text-mainblue">Créer une demande</div>
        <div className="text-slate-600 mt-1">POST /api/requests/</div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="font-bold text-mainblue">NIN</label>
            <input
              className="mt-1 w-full rounded-xl border border-mainblue/15 p-3"
              value={citizen_nin}
              onChange={(e) => setNin(e.target.value)}
              placeholder="1234567890"
            />
          </div>

          <div>
            <label className="font-bold text-mainblue">Nom complet</label>
            <input
              className="mt-1 w-full rounded-xl border border-mainblue/15 p-3"
              value={full_name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ahmed Yahya"
            />
          </div>

          <div>
            <label className="font-bold text-mainblue">Motif</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-mainblue/15 p-3 min-h-[100px]"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Motif..."
            />
          </div>

          <button
            onClick={submit}
            disabled={loading || !citizen_nin || !full_name}
            className="w-full rounded-xl bg-gradient-to-br from-mainblue to-accent text-white font-extrabold py-3 disabled:opacity-60"
          >
            {loading ? "Envoi..." : "Créer"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-mainblue/15 bg-white shadow p-6">
        <div className="text-xl font-extrabold text-mainblue">Résultat</div>
        <div className="text-slate-600 mt-1">Réponse backend</div>

        {!created ? (
          <div className="text-slate-600 mt-4">Aucune demande créée.</div>
        ) : (
          <div className="mt-4 space-y-2">
            <div><b>ID:</b> {created.id}</div>
            <div><b>NIN:</b> {created.citizen_nin}</div>
            <div><b>Nom:</b> {created.full_name}</div>
            <div className="inline-flex px-3 py-1 rounded-full bg-mainblue/5 border border-mainblue/15 text-mainblue font-extrabold">
              {created.status}
            </div>

            <button
              onClick={() => onOpenDetails(created.id)}
              className="mt-4 w-full rounded-xl border border-mainblue/20 text-mainblue font-extrabold py-3 hover:bg-mainblue/5"
            >
              Ouvrir détails
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
