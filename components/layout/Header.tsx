"use client";

import React, { useState, useEffect } from "react";

interface HeaderProps {
  onThemeChange: (isDark: boolean) => void;
}

export default function Header({ onThemeChange }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
    }
    onThemeChange(isDark);
  }, [isDark, onThemeChange]);

  return (
    <header className="flex items-center justify-between p-4 px-8 h-20 border-b border-border-subtle bg-bg-card/50 backdrop-blur-md">
      <h1 className="text-lg font-black tracking-wider text-cyan-400 uppercase">
        Deepfake Detection Engine
      </h1>
      
      <div className="flex items-center gap-1 p-1 rounded-full border border-border-subtle bg-bg-main text-xs font-semibold">
        <button 
          onClick={() => setIsDark(false)}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${!isDark ? "bg-cyan-400 text-slate-950 font-bold shadow-md" : "text-slate-400"}`}
        >
          ☀️ Light
        </button>
        <button 
          onClick={() => setIsDark(true)}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${isDark ? "bg-slate-800 text-cyan-400 font-bold shadow-md" : "text-slate-400"}`}
        >
          🌙 Dark
        </button>
      </div>
    </header>
  );
}