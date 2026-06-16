"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import UploadArea from "@/components/ui/UploadArea";
import MetricGauge from "@/components/ui/MetricGauge";
import BreakdownChart from "@/components/ui/BreakdownChart";
import ActivityLog from "@/components/ui/ActivityLog";

export interface PredictionData {
  prediction: "Real" | "Fake";
  confidence: number;
  breakdown: {
    faceSwap: number;
    lipSync: number;
    reenactment: number;
  };
  fileName: string;
}

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [activeAnalysis, setActiveAnalysis] = useState<PredictionData | null>(null);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-bg-main">
      <Header onThemeChange={setIsDarkTheme} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {/* Upload Portal Block */}
        <section className="bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Analyze Frame Input
          </h2>
          <UploadArea onAnalysisComplete={setActiveAnalysis} isDark={isDarkTheme} />
        </section>
        
        {/* Metrics Rows: Triggers dynamically or presents default base configurations */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase px-1">
            Telemetry & Metrics Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricGauge data={activeAnalysis} />
            <BreakdownChart data={activeAnalysis} />
            <ActivityLog data={activeAnalysis} />
          </div>
        </section>
        
      </main>
    </div>
  );
}