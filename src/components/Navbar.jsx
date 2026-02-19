import React from "react";

const links = [
  { path: "/", label: "Accueil" },
  { path: "/requests", label: "Demandes" },
  { path: "/outbox", label: "Outbox" },
  { path: "/assistant", label: "Assistant RAG" },
];

export default function Navbar({ path, onNavigate }) {
  return (
    <div className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-mainblue/15">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button
          className="flex items-center gap-3 font-extrabold text-mainblue"
          onClick={() => onNavigate("/")}
        >
           <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/National_Seal_of_Mauritania.svg/960px-National_Seal_of_Mauritania.svg.png"
            alt="Logo Ministère"
            className="w-10 h-10 rounded-2xl object-cover border border-mainblue/15"
          />
          NationConnect <span className="text-accent">/ Justice</span>
        </button>

        <div className="flex flex-wrap gap-2">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => onNavigate(l.path)}
              className={`px-3 py-2 rounded-xl font-bold ${
                path === l.path
                  ? "bg-mainblue/10 text-mainblue"
                  : "text-slate-600 hover:bg-mainblue/5 hover:text-mainblue"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
