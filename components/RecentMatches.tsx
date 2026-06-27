import Link from "next/link";

const MATCHES = [
  { id: 1, teams: "João & Pedro vs Lucas & Rafael", date: "26/06/2025", result: "6–3, 6–4", status: "concluído" },
  { id: 2, teams: "Ana & Carla vs Bia & Marta", date: "22/06/2025", result: "4–6, 6–3, 7–5", status: "concluído" },
  { id: 3, teams: "João & Pedro vs Time C", date: "18/06/2025", result: "6–1, 6–2", status: "concluído" },
];

export default function RecentMatches() {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 24,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Partidas recentes</h2>
        <Link href="/matches" style={{ fontSize: 13, color: "var(--brand)", textDecoration: "none" }}>
          Ver todas →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MATCHES.map((m) => (
          <Link key={m.id} href="/matches" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border)",
              cursor: "pointer",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{m.teams}</p>
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 20,
                  background: "#dcfce7", color: "#16a34a", fontWeight: 500,
                }}>
                  {m.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>📅 {m.date}</p>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>🏆 {m.result}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
