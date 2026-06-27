const POINTS = [
  { n: 1, winner: "A", type: "Ace", duration: "2s", score: "0–15" },
  { n: 2, winner: "B", type: "Erro não forçado", duration: "6s", score: "15–15" },
  { n: 3, winner: "A", type: "Winner", duration: "4s", score: "15–30" },
  { n: 4, winner: "A", type: "Erro devolução", duration: "1s", score: "15–40" },
  { n: 5, winner: "A", type: "Ace", duration: "1s", score: "Game A" },
  { n: 6, winner: "B", type: "Winner", duration: "8s", score: "0–15" },
  { n: 7, winner: "B", type: "Winner", duration: "5s", score: "0–30" },
  { n: 8, winner: "A", type: "Winner", duration: "7s", score: "15–30" },
  { n: 9, winner: "B", type: "Erro não forçado", duration: "3s", score: "30–30" },
  { n: 10, winner: "B", type: "Winner", duration: "9s", score: "30–40" },
  { n: 11, winner: "B", type: "Winner", duration: "11s", score: "Game B" },
];

const TYPE_COLORS: Record<string, string> = {
  "Ace": "#0ea5e9",
  "Winner": "#16a34a",
  "Erro não forçado": "#dc2626",
  "Erro devolução": "#d97706",
};

export default function PointHistory() {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Histórico ponto a ponto</h3>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
        🔵 João e Pedro · 🟡 Lucas e Rafael
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {POINTS.map((p) => (
          <div key={p.n} style={{
            display: "grid",
            gridTemplateColumns: "32px 28px 1fr auto auto",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            background: p.winner === "A" ? "#eff6ff" : "#fffbeb",
            border: "1px solid " + (p.winner === "A" ? "#bfdbfe" : "#fde68a"),
            borderRadius: 8,
          }}>
            <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>#{p.n}</p>
            <span style={{ fontSize: 18 }}>{p.winner === "A" ? "🔵" : "🟡"}</span>
            <span style={{
              fontSize: 12, padding: "2px 8px", borderRadius: 20,
              background: (TYPE_COLORS[p.type] || "#888") + "22",
              color: TYPE_COLORS[p.type] || "#888",
              fontWeight: 600, width: "fit-content",
            }}>
              {p.type}
            </span>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>⏱ {p.duration}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", minWidth: 60, textAlign: "right" }}>
              {p.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
