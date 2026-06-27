"use client";

import { useState } from "react";

const HEATMAP_A = [
  [0.1, 0.2, 0.3, 0.2, 0.1],
  [0.2, 0.5, 0.8, 0.4, 0.2],
  [0.3, 0.6, 0.9, 0.5, 0.3],
  [0.1, 0.3, 0.4, 0.3, 0.1],
  [0.05, 0.1, 0.2, 0.1, 0.05],
];

const HEATMAP_B = [
  [0.3, 0.4, 0.6, 0.4, 0.3],
  [0.2, 0.3, 0.5, 0.3, 0.2],
  [0.1, 0.2, 0.3, 0.2, 0.1],
  [0.3, 0.6, 0.8, 0.5, 0.3],
  [0.1, 0.2, 0.3, 0.2, 0.1],
];

export default function CourtHeatmap() {
  const [team, setTeam] = useState("A");
  const data = team === "A" ? HEATMAP_A : HEATMAP_B;
  const cellW = 80, cellH = 56;
  const cols = 5, rows = 5;
  const W = cols * cellW, H = rows * cellH;

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Mapa de posicionamento</h3>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>Heatmap de frequência de posição na quadra</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["A", "B"].map((t) => (
            <button key={t} onClick={() => setTeam(t)} style={{
              padding: "6px 14px", borderRadius: 6, border: "1px solid var(--border)",
              background: team === t ? (t === "A" ? "#0ea5e9" : "#f59e0b") : "transparent",
              color: team === t ? "#fff" : "var(--muted)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {t === "A" ? "João & Pedro" : "Lucas & Rafael"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width={W} height={H + 40} viewBox={"0 0 " + W + " " + (H + 40)}>
          <rect x={0} y={20} width={W} height={H} fill="#1a3a2a" rx={8} />
          <line x1={0} y1={20 + H / 2} x2={W} y2={20 + H / 2}
            stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="6 4" />
          <rect x={0} y={20} width={W} height={H} fill="none"
            stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} rx={8} />
          <line x1={W / 2} y1={20} x2={W / 2} y2={20 + H}
            stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          {data.map((row, ri) =>
            row.map((val, ci) => (
              <rect
                key={ri + "-" + ci}
                x={ci * cellW} y={20 + ri * cellH}
                width={cellW} height={cellH}
                fill={team === "A" ? "rgba(14,165,233," + (val * 0.85) + ")" : "rgba(251,191,36," + (val * 0.85) + ")"}
                rx={2}
              />
            ))
          )}
          <text x={W / 2} y={14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10}>REDE</text>
          <text x={W / 2} y={H + 36} textAnchor="middle" fill="#64748b" fontSize={10}>FUNDO DE QUADRA</text>
        </svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, justifyContent: "center" }}>
        <p style={{ fontSize: 12, color: "var(--muted)" }}>Menor frequência</p>
        <div style={{
          width: 120, height: 10, borderRadius: 4,
          background: team === "A"
            ? "linear-gradient(to right, rgba(14,165,233,0.1), rgba(14,165,233,0.9))"
            : "linear-gradient(to right, rgba(251,191,36,0.1), rgba(251,191,36,0.9))",
        }} />
        <p style={{ fontSize: 12, color: "var(--muted)" }}>Maior frequência</p>
      </div>
    </div>
  );
}
