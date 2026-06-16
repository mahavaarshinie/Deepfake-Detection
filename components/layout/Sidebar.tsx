import React from "react";

const NavLink = ({ icon, text, active }: { icon: string; text: string; active?: boolean }) => (
  <div className={`flex items-center gap-3.5 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? "bg-blue-900/40 text-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-[#0a0d16]"}`}>
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{text}</span>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0d121f] border border-blue-900/30 rounded-2xl flex flex-col p-5 gap-6 m-4 mt-0">
      <div className="text-xs font-bold tracking-widest text-slate-500 uppercase px-2 pt-2">
        Analysis Portal
      </div>
      
      <nav className="flex-grow space-y-1">
        <NavLink icon="📊" text="Dashboard" active />
        <NavLink icon="⚙️" text="Model Status (ONLINE)" />
        <NavLink icon="📂" text="Results Archive" />
        <NavLink icon="📄" text="Project Docs" />
      </nav>
      
      <div className="mt-auto p-4 bg-[#0a0d16] border border-blue-900/20 rounded-xl text-slate-500 text-center text-xs font-medium">
        Platform Status: ACTIVE
      </div>
    </aside>
  );
}