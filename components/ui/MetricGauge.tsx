import React from "react";
import { PredictionData } from "@/app/page";

export default function MetricGauge({ data }: { data: PredictionData | null }) {
  const value = data ? data.confidence : 0;
  const radius = 50;
  const strokeDashoffset = (2 * Math.PI * radius / 2) * (1 - value / 100);

  return (
    <div className="bg-bg-card border border-border-subtle p-5 rounded-2xl flex flex-col justify-between h-56 w-full">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Confidence</h3>
      <div className="relative flex flex-col items-center justify-center mt-2 max-w-[160px] mx-auto w-full">
        <svg className="w-full h-auto" viewBox="0 0 120 70">
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#1e293b" strokeWidth="9" strokeLinecap="round" />
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={data?.prediction === "Fake" ? "#f43f5e" : "#10b981"} strokeWidth="9" strokeLinecap="round" strokeDasharray={Math.PI * radius} strokeDashoffset={strokeDashoffset} className="transition-all duration-700" />
        </svg>
        <div className="absolute bottom-2 text-center">
          <span className="text-2xl font-black block">{value > 0 ? `${value.toFixed(1)}%` : "--"}</span>
          <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-500">Confidence</span>
        </div>
      </div>
      <div className="text-[10px] text-center text-slate-500 border-t border-border-subtle/50 pt-2 font-mono">MODEL: DSRxNet Core</div>
    </div>
  );
}