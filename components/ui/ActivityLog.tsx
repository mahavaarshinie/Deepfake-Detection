import React from "react";
import { PredictionData } from "@/app/page";

export default function ActivityLog({ data }: { data: PredictionData | null }) {
  return (
    <div className="bg-bg-card border border-border-subtle p-5 rounded-2xl flex flex-col justify-between h-56 w-full">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">System Activity</h3>
      <div className="flex-grow flex items-center justify-center">
        {data ? (
          <div className="w-full p-3 bg-bg-main border border-border-subtle rounded-xl flex items-center justify-between text-xs font-mono animate-fadeIn">
            <div>
              <span className="text-slate-400 font-bold block truncate max-w-[140px]">{data.fileName}</span>
              <span className="text-slate-500 text-[10px]">STATUS: PROCESS_COMPLETE</span>
            </div>
            <div className="text-right">
              <span className={`font-black block text-sm ${data.prediction === "Fake" ? "text-rose-500" : "text-emerald-500"}`}>{data.prediction}</span>
              <span className="text-[10px] text-slate-500">{data.confidence.toFixed(1)}% Conf.</span>
            </div>
          </div>
        ) : (
          <span className="text-xs text-slate-500 italic">No image context actively loaded</span>
        )}
      </div>
      <div className="text-[10px] text-slate-500 text-center border-t border-border-subtle/50 pt-2">Single-Frame Logging Active</div>
    </div>
  );
}