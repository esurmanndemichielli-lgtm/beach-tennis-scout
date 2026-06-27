"use client";

import { useState } from "react";
import StatsTable from "@/components/StatsTable";
import RallyChart from "@/components/RallyChart";
import PointHistory from "@/components/PointHistory";
import CourtHeatmap from "@/components/CourtHeatmap";

const TABS = ["Estatísticas", "Gráficos", "Histórico", "Heatmap"];

export default function MatchPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{
        background: "var(--court)",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 28,
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
            Partida — 26/06/2025
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>
            João & Pedro <span style={{ opacity: 0.5, margin: "0 12px" }}>vs</span> Lucas & Rafael
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 4 }}>Resultado</p>
          <p style={{ fontSize: 28, fontWeight: 800 }}>6–3 · 6–4</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? "var(--brand)" : "var(--muted)",
              borderBottom: activeTab === i ? "2px solid var(--brand)" : "2px solid transparent",
              marginBottom: -1,
              transition: "all 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && <StatsTable />}
      {activeTab === 1 && <RallyChart />}
      {activeTab === 2 && <PointHistory />}
      {activeTab === 3 && <CourtHeatmap />}
    </div>
  );
}
