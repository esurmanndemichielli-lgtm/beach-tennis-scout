const STATS = [
  { label: "Pontos disputados", a: 52, b: 52 },
  { label: "Saques realizados", a: 28, b: 26 },
  { label: "Erros de saque", a: 3, b: 6 },
  { label: "Aces", a: 5, b: 2 },
  { label: "Winners", a: 18, b: 11 },
  { label: "Erros não forçados", a: 9, b: 16 },
  { label: "Erros de devolução", a: 4, b: 7 },
  { label: "Aproveitamento de saque", a: "89%", b: "77%" },
  { label: "Duração média do rally", a: "4.2s", b: "4.2s" },
];

export default function StatsTable() {
  return (
    <div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 140px 140px",
        padding: "12px 16px", marginBottom: 4,
        background: "var(--court)", borderRadius: 10, color: "#fff",
      }}>
        <p style={{ fontSize: 13 }}>Estatística</p>
        <p style={{ fontSize: 13, textAlign: "center", fontWeight: 700, color: "#38bdf8" }}>João & Pedro</p>
        <p style={{ fontSize: 13, textAlign: "center", fontWeight: 700, color: "#fbbf24" }}>Lucas & Rafael</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {STATS.map((stat, i) => {
          const aNum = typeof stat.a === "number" ? stat.a : 0;
          const bNum = typeof stat.b === "number" ? stat.b : 0;
          const aWins = aNum > bNum;
          return (
            <div key={stat.label} style={{
              display: "grid", gridTemplateColumns: "1fr 140px 140px",
              padding: "12px 16px",
              background: i % 2 === 0 ? "var(--card)" : "#f8fafc",
              border: "1px solid var(--border)",
              borderRadius: 8,
            }}>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>{stat.label}</p>
              <p style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: aWins ? "#16a34a" : "var(--text)" }}>
                {stat.a}
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: !aWins && bNum > aNum ? "#16a34a" : "var(--text)" }}>
                {stat.b}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
