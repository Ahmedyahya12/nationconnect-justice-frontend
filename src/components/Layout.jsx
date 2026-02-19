import React from "react";
import Navbar from "./Navbar";

export default function Layout({ path, onNavigate, children }) {
  return (
    <div className="min-h-screen bg-soft">
      <Navbar path={path} onNavigate={onNavigate} />
      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
