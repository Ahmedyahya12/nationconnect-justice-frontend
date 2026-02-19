import React from "react";

export default function Home({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-mainblue/15 bg-white shadow p-6 md:p-8">
        <div className="flex items-center gap-4">
          <img
            src="https://le3goud.digital/assets/images/logo-ministere.jpg"
            alt="Logo Ministère"
            className="w-80 h-20 rounded-2xl object-cover border border-mainblue/15"
          />

          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-500 truncate">
              République Islamique de Mauritanie
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-mainblue leading-tight">
              Services en ligne — Justice
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Déposez et suivez votre demande facilement.
            </p>
          </div>
        </div>

        {/* Quick buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate?.("/requests")}
            className="rounded-2xl bg-gradient-to-br from-mainblue to-accent text-white font-extrabold py-3 px-5 hover:opacity-95"
          >
            Déposer une demande
          </button>

          <button
            onClick={() => onNavigate?.("/assistant")}
            className="rounded-2xl border border-mainblue/20 text-mainblue font-extrabold py-3 px-5 hover:bg-mainblue/5"
          >
            Assistant (FAQ)
          </button>
        </div>
      </div>

      {/* Short links */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate?.("/requests")}
          className="text-left rounded-3xl border border-mainblue/15 bg-white shadow p-6 hover:bg-mainblue/5 transition"
        >
          <div className="text-mainblue font-extrabold text-lg">Demandes</div>
          <div className="text-slate-600 text-sm mt-1">Créer + consulter une demande.</div>
        </button>

        <button
          onClick={() => onNavigate?.("/assistant")}
          className="text-left rounded-3xl border border-mainblue/15 bg-white shadow p-6 hover:bg-mainblue/5 transition"
        >
          <div className="text-mainblue font-extrabold text-lg">Assistant</div>
          <div className="text-slate-600 text-sm mt-1">Questions basées sur la procédure.</div>
        </button>

        <button
          onClick={() => onNavigate?.("/outbox")}
          className="text-left rounded-3xl border border-mainblue/15 bg-white shadow p-6 hover:bg-mainblue/5 transition"
        >
          <div className="text-mainblue font-extrabold text-lg">Historique</div>
          <div className="text-slate-600 text-sm mt-1">Événements (admin/demo).</div>
        </button>
      </div>
    </div>
  );
}
