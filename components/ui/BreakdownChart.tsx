import React from "react";
import { PredictionData } from "@/app/page";

export default function BreakdownChart({ data }: { data: PredictionData | null }) {
  const fs = data ? data.breakdown.faceSwap : 0;
  const ls = data ? data.breakdown.lipSync : 0;
  const re = data ? data.breakdown.reenactment : 0;

  const gradient = data 
    ? `conic-gradient(#00ffff 0% ${fs}%, #2563eb ${fs}% ${fs + ls}%, #334155 ${fs + ls}% 100%)`
    : `conic-gradient(#1e293b 0% 100%)`;

  return (
    <div className="bg-bg-card border border-border-subtle p-5 rounded-2xl flex flex-col justify-between h-56 w-full">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detection Breakdown</h3>
      <div className="flex items-center justify-between gap-4 my-2">
        <div className="w-20 h-20 rounded-full flex items-center justify-center relative flex-shrink-0 transition-all" style={{ background: gradient }}>
          <div className="w-14 h-14 rounded-full bg-bg-card" />
        </div>
        <div className="flex-1 space-y-1.5 text-[11px] font-medium">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00ffff]" /><span>{fs}% Face Swap</span></div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#2563eb]" /><span>{ls}% Lip Sync</span></div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#334155]" /><span>{re}% Re-enactment</span></div>
        </div>
      </div>
      <div className="text-[10px] text-slate-500 text-center border-t border-border-subtle/50 pt-2">Classification Distribution Layer</div>
    </div>
  );
}